import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { ChatRoom } from './entities/chat-room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRepository: Repository<ChatRoom>,
  ){}

  createRoom(createRoomDto: CreateRoomDto) {
    const result = this.chatRepository.save(createRoomDto.toChatRoomEntity());
    console.log(result);
    return result;
    return 'hi';
  }

}
