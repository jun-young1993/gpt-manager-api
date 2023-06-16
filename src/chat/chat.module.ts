import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chat-room.entity';

@Module({
  imports : [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
