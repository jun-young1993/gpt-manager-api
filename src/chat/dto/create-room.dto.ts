import { User } from 'src/user/entities/user.entity';
import { ChatRoom } from '../entities/chat-room.entity';

export class CreateRoomDto {
  user_id: string;

  setUserId(userId: string) {
    this.user_id = userId;
  }

  toChatRoomEntity(): ChatRoom {
    return ChatRoom.createRoomFromDto(this.user_id);
  }
}
