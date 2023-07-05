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

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ChatRoom, Chat]),
    ChatModule,
    GoogleTrendsModule,
    GoogleTrendsMappingModule,
    GptModule,
  ],
  controllers: [TasksController],
  providers: [RedisService, ChatService, TasksService, GoogleTrendsService],
  exports: [ScheduleModule, ChatModule, RedisService],
})
export class TasksModule {}
