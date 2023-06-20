import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import JwtAuthGuard from 'src/jwt/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { RealIP } from 'nestjs-real-ip';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('room')
  // @UseGuards(JwtAuthGuard)
  createRoom(@Req() { user }: { user?: User }, @RealIP() ip) {
    const createRoomDto = new CreateRoomDto();
    createRoomDto.setUserId(user ? user.id : ip);
    return this.chatService.createRoom(createRoomDto);
  }
}
