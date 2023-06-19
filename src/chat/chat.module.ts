import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { Chat } from './entities/chat.entity';

@Module({
  imports : [TypeOrmModule.forFeature([ChatRoom]),TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatService],
  exports : [ChatModule,ChatService]
})
export class ChatModule {}
