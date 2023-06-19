import { User } from 'src/user/entities/user.entity';
import { ChatRoom } from '../entities/chat-room.entity';
import { IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  user_id: string;

  setUserId(userId: string) {
    this.user_id = userId;
  }

  toChatRoomEntity(): ChatRoom {
    return ChatRoom.createRoomFromDto(this.user_id);
  }
}
