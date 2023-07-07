import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.save(
      createCommentDto.toCommentEntity(),
    );
  }

  async findByComment(commentId: string) {
    return await this.commentRepository.find({
      where: {
        isDeleted: IS_DELETED.N,
        commentId: commentId,
      },
    });
  }
}
