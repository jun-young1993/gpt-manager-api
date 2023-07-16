import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateNoticeBoardDto } from '../dto/create-notice-board.dto';
import { IsEnum } from 'class-validator';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';
export type NoticeBoardColumn = typeof NoticeBoard[keyof typeof NoticeBoard];
@Entity('notice_board')
export class NoticeBoard {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  title: string;

  @Column({
    length: 30,
  })
  author: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    default: 0,
  })
  views: number;

  @Column({
    default: 0,
  })
  likes: number;

  @Column({
    length: 30,
  })
  category: string;

  @Column({
    name: 'content_type',
    length: 10,
  })
  contentType: string;

  @Column({
    name: 'is_deleted',
    type: 'varchar',
    length: 1,
    default: IS_DELETED.N,
  })
  @IsEnum(IS_DELETED)
  public isDeleted: IS_DELETED;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  static createFromDto(createDto: CreateNoticeBoardDto) {
    const noticeBoard = new NoticeBoard();
    return Object.assign(noticeBoard, createDto);
  }
}
