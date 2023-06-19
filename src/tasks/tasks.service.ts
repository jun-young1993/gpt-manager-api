import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisService } from '../redis/redis.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from '../chat/entities/chat-room.entity';
import { Repository } from 'typeorm';
import { ChatService } from '../chat/chat.service';
import { CreateChatDto } from 'src/chat/dto/create-chat.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly chatService: ChatService,
  ) {}

  @Cron('* 10 * * * *')
  async syncChat() {
    try {
      console.log(new Date().getMinutes(), new Date().getSeconds());
      console.log('Called when the current second is 45');

      const nonSyncRooms = await this.chatService.getNonSyncRooms();
      console.log('nonSyncRooms', nonSyncRooms);
      nonSyncRooms.map(async (chatData, index) => {
        const { id } = chatData;
        const cacheChatRoom = await this.redisService.get(id);
        console.log(cacheChatRoom);
        if (cacheChatRoom === null) {
          await this.chatService.updateSyncRoomByNonSyncRoomId(id);
        } else {
          const cacheChats = JSON.parse(cacheChatRoom);
          cacheChats.map(async (cacheChatDto: CreateChatDto) => {
            try{
              const createChat = await this.chatService.createChat(
                Object.assign(new CreateChatDto(), cacheChatDto),
              );
              await this.chatService.updateSyncRoomByNonSyncRoomId(id);
              
            } catch (e) {
              console.log(e)
            }
            
          })
        }

        console.log('cacheChatRoom', cacheChatRoom);
      });
    } catch (e) {
      console.log('[EXCEPTION]', e);
    }
  }
}
