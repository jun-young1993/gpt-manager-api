import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisService } from '../redis/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from '../chat/entities/chat-room.entity';
import { ChatService } from '../chat/chat.service';
import { ChatModule } from '../chat/chat.module';
import { TasksService } from './tasks.service';
import { Chat } from 'src/chat/entities/chat.entity';
import { TasksController } from './tasks.controller';
import { GoogleTrendsModule } from 'src/google-trends/google-trends.module';
import { GoogleTrendsService } from 'src/google-trends/google-trends.service';
import { GptModule } from 'src/gpt/gpt.module';
import { GoogleTrendsMappingModule } from 'src/google-trends-mapping/google-trends-mapping.module';
import {Code} from "../code/entities/code.entity";
import {CodeItem} from "../code-item/entities/code-item.entity";
import {CodeModule} from "../code/code.module";
import {CodeItemModule} from "../code-item/code-item.module";
import {NoticeBoardModule} from "../notice-board/notice-board.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ChatRoom, Chat,Code,CodeItem]),
    ChatModule,
    GoogleTrendsModule,
    GoogleTrendsMappingModule,
    GptModule,
    CodeModule,
    CodeItemModule,
    NoticeBoardModule,
  ],
  controllers: [TasksController],
  providers: [RedisService, ChatService, TasksService, GoogleTrendsService],
  exports: [ScheduleModule, ChatModule, RedisService],
})
export class TasksModule {}
