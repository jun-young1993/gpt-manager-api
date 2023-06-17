import { Module } from '@nestjs/common';
import {ScheduleModule} from "@nestjs/schedule";
import {RedisService} from "../redis/redis.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChatRoom} from "../chat/entities/chat-room.entity";
import {ChatService} from "../chat/chat.service";
import {ChatModule} from "../chat/chat.module";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([ChatRoom]),
        ChatModule
    ],
    providers : [RedisService,ChatService],
    exports : [ScheduleModule]
})
export class TasksModule {}
