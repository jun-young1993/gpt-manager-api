import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('chat_room')
export class ChatRoom {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 36,
  })
  user_id: string;

  @Column({type: "boolean", default : false})
  sync : boolean

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  static createRoomFromDto(userId: string): ChatRoom {
    const chatRoom = new ChatRoom();
    chatRoom.id = uuid();
    chatRoom.user_id = userId;
    return chatRoom;
  }
}
