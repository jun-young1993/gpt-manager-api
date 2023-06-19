import { Module } from '@nestjs/common';
import {ScheduleModule} from "@nestjs/schedule";
import {RedisService} from "../redis/redis.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChatRoom} from "../chat/entities/chat-room.entity";
import {ChatService} from "../chat/chat.service";
import {ChatModule} from "../chat/chat.module";
import { TasksService } from './tasks.service';
import { Chat } from 'src/chat/entities/chat.entity';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([ChatRoom]),
        TypeOrmModule.forFeature([Chat]),
        ChatModule
    ],
    providers : [RedisService,ChatService,TasksService],
    exports : [ScheduleModule,ChatModule,RedisService]
})
export class TasksModule {}
