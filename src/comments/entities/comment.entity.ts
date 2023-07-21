import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentTypeStrings } from '../comments.interface';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';
import { IsEnum } from 'class-validator';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    type: 'varchar',
    length: 36,
    name: 'comment_id',
  })
  public commentId: string;

  @Column()
  public type: CommentTypeStrings;

  @Column({
    type: 'text',
  })
  public comment: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'parent_comment_id',
  })
  public parentCommentId?: number;

  @Column({
    type: 'varchar',
    length: 36,
    name: 'user_id',
  })
  userId: string;

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

  static createFromDto(createDto: CreateCommentDto): Comment {
    const comment = new Comment();

    return Object.assign(comment, createDto);
  }
}
