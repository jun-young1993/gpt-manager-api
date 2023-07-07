import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentTypeStrings } from '../comments.interface';

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
    type: 'number',
    nullable: true,
  })
  public parentCommentId?: number;

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
