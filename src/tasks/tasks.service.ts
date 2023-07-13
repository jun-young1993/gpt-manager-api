import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RedisService } from '../redis/redis.service';
import { ChatService } from '../chat/chat.service';
import { CreateChatDto } from 'src/chat/dto/create-chat.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GoogleTrendsService } from 'src/google-trends/google-trends.service';
import { Logger } from 'winston';
import { GptService } from 'src/gpt/gpt.service';
import { ChatCompletionRequestMessage, CreateCompletionRequest } from 'openai';
import { CreateGoogleTrendDto } from 'src/google-trends/dto/create-google-trend.dto';
import {
  GoogleGeoCode,
  GooGleTrendGeos,
  GoogleTrendTypes,
} from 'src/google-trends/google-trends.interface';
import { GoogleTrendsMappingService } from 'src/google-trends-mapping/google-trends-mapping.service';
import {IS_DELETED, NOTICE_CONTENT_TYPE} from 'src/typeorm/typeorm.interface';
import sleep from 'src/lib/sleep';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { prompts } from '../config/config';
import { Not } from 'typeorm';
import {CodeItemService} from "../code-item/code-item.service";
import {CodeService} from "../code/code.service";
import {NoticeBoardService} from "../notice-board/notice-board.service";
import {CreateNoticeBoardDto} from "../notice-board/dto/create-notice-board.dto";

@Injectable()
export class TasksService {
  constructor(
    private readonly redisService: RedisService,
    private readonly chatService: ChatService,
    private readonly googleTrendService: GoogleTrendsService,
    private readonly googleTrendsMappingService: GoogleTrendsMappingService,
    private readonly gptService: GptService,
    private readonly codeItemService: CodeItemService,
    private readonly codeService: CodeService,
    private readonly  noticeBoardService: NoticeBoardService,

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

  @Cron(CronExpression.EVERY_4_HOURS)
  async daily() {
    try {
      
      for (const [_, geo] of Object.entries(GooGleTrendGeos)) {
        const dailyTrends = await this.googleTrendService.daily(geo);
        const trendingSearchDays = dailyTrends.default.trendingSearchesDays;
        for (const trendingSearchDay of trendingSearchDays) {
          const trendingSearchDayDate = trendingSearchDay.date;

          this.logger.info(
            `[START GOOGLE TRENDY FOR TO DAY] ${trendingSearchDayDate}`,
          );
          for (const trendingSearch of trendingSearchDay.trendingSearches) {
            const googleTrendsMapping =
              await this.googleTrendsMappingService.findOrCreate({
                isDeleted: IS_DELETED.N,
                geo: geo,
                date: trendingSearchDayDate,
                title: trendingSearch.title.query,
              });

            for (const articles of trendingSearch.articles) {
              const { title, url } = articles;
              const googleTrend = await this.googleTrendService.getOne({
                where: {
                  mapping_id: googleTrendsMapping.id,
                  url: url,
                },
              });
              if (isEmpty(googleTrend)) {
                let articleContent = '';
                const googleTrendDto = new CreateGoogleTrendDto();
                const articleContentCount = await this.googleTrendService
                  .getRepository()
                  .count({
                    where: {
                      mapping_id: googleTrendsMapping.id,
                      articleContent: Not(''),
                    },
                  });
                this.logger.info(
                  `article content count ${articleContentCount}`,
                );
                if (articleContentCount <= 3) {
                  const result = await this.gptService.createChatCompletion(
                    prompts.article(title, url, geo),
                  );
                  const { content } = result.choices[0].message;
                  articleContent = content;
                  this.logger.info(JSON.stringify(result));
                  await sleep(3000);
                }

                await this.googleTrendService.create(
                  Object.assign(googleTrendDto, {
                    mapping_id: googleTrendsMapping.id,
                    title: title,
                    url: url,
                    articleContent: articleContent,
                  }),
                );
              }
            }

            await sleep(1000);
          }
          await sleep(1000);
        }
      }
      //
      // for (const [_, geo] of Object.entries(GooGleTrendGeos)) {
      //   const dailyTrends = await this.googleTrendService.daily(geo);
      //   const trendingSearchDays = dailyTrends.default.trendingSearchesDays;
      //
      //   // trendingSearchDays.forEach(async (trendingSearchDay) => {
      //   for (const trendingSearchDay of trendingSearchDays) {
      //     this.logger.info('[Trend Searching...]');
      //     // trendingSearchDay.trendingSearches.forEach(async (trendingSearch) => {
      //     for (const trendingSearch of trendingSearchDay.trendingSearches) {
      //       const trendTitle = trendingSearch.title.query;
      //       const getGoogleTrend = await this.googleTrendService.findOne({
      //         start_date: moment().format('YYYY-MM-DD'),
      //         end_date: moment().format('YYYY-MM-DD'),
      //         title: trendTitle,
      //         type: GoogleTrendTypes.DAILY,
      //         geo: geo,
      //       });
      //       this.logger.info(
      //         '[tasks.service.ts(getGoogleTrend)]',
      //         getGoogleTrend,
      //       );
      //       if (getGoogleTrend === null) {
      //         this.logger.info(
      //           '[tasks.service.ts(getGoogleTrend)]',
      //           'continue',
      //         );
      //         continue;
      //       }
      //       const systemContent: ChatCompletionRequestMessage[] = [
      //         {
      //           role: 'system',
      //           content: `You are an article content analyst. Please explain the analysis in Korean through the article title and URL in detail enough for a 5-year-old child to understand. The article title is '${trendTitle}'.`,
      //         },
      //       ];
      //       // trendingSearch.articles.forEach((articles) => {
      //       for (const articles of trendingSearch.articles) {
      //         systemContent.push({
      //           role: 'user',
      //           content: `The article title is '${articles.title}' and the url is '${articles.url}'`,
      //         } as ChatCompletionRequestMessage);
      //       }
      //
      //       this.logger.info(JSON.stringify(systemContent));
      //
      //       const result = await this.gptService.createChatCompletion({
      //         model: 'gpt-3.5-turbo',
      //         messages: systemContent,
      //       });
      //
      //       this.logger.info(JSON.stringify(result));
      //       const { content } = result.choices[0].message;
      //       this.logger.info(content);
      //
      //       const createGoogleTrendDto = new CreateGoogleTrendDto();
      //
      //       const googleTrendEntity = await this.googleTrendService.create(
      //         Object.assign(createGoogleTrendDto, {
      //           title: trendTitle,
      //           articleContent: content,
      //           type: GoogleTrendTypes.DAILY,
      //           geo: geo,
      //         }),
      //       );
      //
      //       this.logger.info(
      //         '[tasks.service.ts(googleTrendEntity)]',
      //         googleTrendEntity,
      //       );
      //       await sleep(10000);
      //     }
      //   }
      // }

      return true;
    } catch (e) {
      this.logger.error('[TASK DAILY EXCEPTION]', e);
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async topic() {
    try{
      const categoryCode = "commu-category";
      const categoryCodes = await this.codeItemService.findOneByCode(categoryCode)
      const categoryCodeRandomNumber = Math.floor(Math.random() * (categoryCodes.length))
      const randomCategory = categoryCodes[categoryCodeRandomNumber]
      const findCategoryCode = await this.codeService.findOne({
        where: {
          code: randomCategory.key
        }
      })

      const topicCodes = await this.codeItemService.findOneByCodeId( findCategoryCode.id)
      const topicCodeRandomNumber = Math.floor(Math.random() * (topicCodes.length));
      const {value, key} = topicCodes[topicCodeRandomNumber];



      const result = await this.gptService.createChatCompletion(
          prompts.topic(value),
      );
      this.logger.info(JSON.stringify(result));
      const { content } = result.choices[0].message;
      const title = content.split('\n')[0];
      const createNoticeBoardDto = Object.assign(new CreateNoticeBoardDto(),{
        title: title,
        author: "Guest",
        content: content,
        category: key,
        contentType: NOTICE_CONTENT_TYPE.text
      })

      const createNoticeBoard = await this.noticeBoardService.create(createNoticeBoardDto)

      return createNoticeBoard;
    }catch(e){
      this.logger.error(e);
    }


  }
}
