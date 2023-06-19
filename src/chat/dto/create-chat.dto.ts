import { ChatRoleType } from 'src/gpt/gpt.interface';
import { Chat } from '../entities/chat.entity';

export class CreateChatDto {
  order: number;

  role: ChatRoleType;

  content: string;

  uuid: string;

  createdAt: Date;

  updatedAt?: Date;

  toChatEntity(): Chat {
    return Chat.chatFromDto(this);
  }


}
