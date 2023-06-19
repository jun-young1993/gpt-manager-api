import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateChatDto } from '../dto/create-chat.dto';
import { v4 as uuid } from 'uuid';

@Entity('chats')
export class Chat {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({ type: 'int' })
  order: number;

  @Column({type : "varchar", length : 15})
  role : string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'uuid',
    length: 36,
  })
  uuid: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  static chatFromDto(chatDto: CreateChatDto): Chat {
    const chat = new Chat();
    chat.id = uuid();
    chat.order = chatDto.order;
    chat.role = chatDto.role;
    chat.content = chatDto.content;
    chat.uuid = chatDto.uuid;
    chat.createdAt = chatDto.createdAt;
    chat.updatedAt = chatDto.updatedAt ?? chatDto.createdAt;
	return chat;
  }
}
