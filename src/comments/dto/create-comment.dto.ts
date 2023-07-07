import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CommentType } from '../comments.interface';
import { Comment } from '../entities/comment.entity';

export class CreateCommentDto {
  @IsString()
  commentId: string;

  @IsString()
  @IsEnum(CommentType)
  type: string;

  @IsString()
  comment: string;

  @IsOptional()
  parentCommentId?: number;

  toCommentEntity(): Comment {
    return Comment.createFromDto(this);
  }
}
