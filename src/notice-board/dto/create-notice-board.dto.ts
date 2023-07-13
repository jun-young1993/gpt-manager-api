import { IsEnum, IsString } from 'class-validator';
import { NoticeBoard } from '../entities/notice-board.entity';
import { NOTICE_CONTENT_TYPE } from 'src/typeorm/typeorm.interface';

export class CreateNoticeBoardDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  content: string;

  @IsString()
  category: string;

  @IsEnum(NOTICE_CONTENT_TYPE)
  contentType: string;

  toNoticeBoardEntity(): NoticeBoard {
    return NoticeBoard.createFromDto(this);
  }
}
