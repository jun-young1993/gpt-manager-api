import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {RedisService} from "../redis/redis.service";
import {InjectRepository} from "@nestjs/typeorm";
import {ChatRoom} from "../chat/entities/chat-room.entity";
import {Repository} from "typeorm";
import {ChatService} from "../chat/chat.service";

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly redisService : RedisService,
        private readonly chatService: ChatService
    ) {
    }


    @Cron('1 * * * * *')
    async handleCron() {
        console.log(new Date().getMinutes(), new Date().getSeconds())
        console.log('Called when the current second is 45');

            const nonSyncRooms = await this.chatService.getNonSyncRooms()

            nonSyncRooms.map(async (chatData, index) => {

                    const {id} = chatData;
                    const cacheChatRoom = await this.redisService.get(id)
                    if(cacheChatRoom === null){
                        await this.chatService.updateNonSyncRoom(id);

                    }
                    console.log("cacheChatRoom",cacheChatRoom);


            })


    }

}