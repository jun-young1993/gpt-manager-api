import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { ChatRoom } from './entities/chat-room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ){}

  createChat(createChatDto: CreateChatDto) {
    
    return this.chatRepository.save(createChatDto.toChatEntity());
  }

  createRoom(createRoomDto: CreateRoomDto) {
    const result = this.chatRoomRepository.save(
      createRoomDto.toChatRoomEntity(),
    );

    return result;

  }

  getNonSyncRooms(){
    return this.chatRoomRepository.find({
      where : {
        sync : false
      }
    })
  }

  updateSyncRoomByNonSyncRoomId(id : string){
    return this.chatRoomRepository.update(id,{
      sync : true
    })
  }
}
