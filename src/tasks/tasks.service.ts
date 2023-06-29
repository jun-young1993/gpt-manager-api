import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisService } from '../redis/redis.service';
import { ChatService } from '../chat/chat.service';
import { CreateChatDto } from 'src/chat/dto/create-chat.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GoogleTrendsService } from 'src/google-trends/google-trends.service';
import { Logger } from 'winston';
import { GptService } from 'src/gpt/gpt.service';
import { ChatCompletionRequestMessage } from 'openai';

@Injectable()
export class TasksService {
  constructor(
    private readonly redisService: RedisService,
    private readonly chatService: ChatService,
    private readonly googleTrendService: GoogleTrendsService,
    private readonly gptService: GptService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Cron('10 10 11 * * *')
  async syncChat() {
    try {
      this.logger.info('[CHAT-SYNC IDS]');

      const nonSyncRooms = await this.chatService.getNonSyncRooms();

      nonSyncRooms.map(async (chatData, index) => {
        const { id } = chatData;
        const cacheChatRoom = await this.redisService.get(id);

        if (cacheChatRoom === null) {
          await this.chatService.updateSyncRoomByNonSyncRoomId(id);
        } else {
          const cacheChats = JSON.parse(cacheChatRoom);
          cacheChats.map(async (cacheChatDto: CreateChatDto) => {
            try {
              await this.chatService.createChat(
                Object.assign(new CreateChatDto(), cacheChatDto),
              );
              await this.chatService.updateSyncRoomByNonSyncRoomId(id);
            } catch (e) {
              this.logger.error('[CHAT-SYNC EXCEPTION]', e);
            }
          });
        }

        console.log('cacheChatRoom', cacheChatRoom);
      });
    } catch (e) {
      this.logger.error('[CHAT-SYNC EXCEPTION]', e);
    }
  }

  async daily() {
    try {
      const dailyTrends = await this.googleTrendService.daily();
      const trendingSearchDays = dailyTrends.default.trendingSearchesDays;

      // trendingSearchDays.forEach(async (trendingSearchDay) => {
      for (const trendingSearchDay of trendingSearchDays) {
        this.logger.info('[Trend Searching...]');
        // trendingSearchDay.trendingSearches.forEach(async (trendingSearch) => {
        for (const trendingSearch of trendingSearchDay.trendingSearches) {
          const trendTitle = trendingSearch.title.query;
          const systemContent: ChatCompletionRequestMessage[] = [
            {
              role: 'system',
              content: `${trendTitle}에 대한 기사 url 분석 후 한국어로 정리해줘`,
            },
          ];
          // trendingSearch.articles.forEach((articles) => {
          for (const articles of trendingSearch.articles) {
            systemContent.push({
              role: 'user',
              content: `기사제목: ${articles.title}, url: ${articles.url}`,
            } as ChatCompletionRequestMessage);
          }

          this.logger.info(JSON.stringify(systemContent));

          const result = await this.gptService.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: systemContent,
          });

          this.logger.info(result);
          const { content } = result.choices[0].message;
          this.logger.info(content);
          // });
        }
      }
      return dailyTrends;
    } catch (e) {
      this.logger.error('[TASK DAILY EXCEPTION]', e);
    }
  }
}
