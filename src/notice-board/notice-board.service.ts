import { Injectable } from '@nestjs/common';
import { CreateNoticeBoardDto } from './dto/create-notice-board.dto';
import { UpdateNoticeBoardDto } from './dto/update-notice-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeBoard } from './entities/notice-board.entity';
import {FindManyOptions, FindOneOptions, Repository} from 'typeorm';

@Injectable()
export class NoticeBoardService {
  constructor(
    @InjectRepository(NoticeBoard)
    private readonly noticeBoardRepository: Repository<NoticeBoard>,
  ) {}
  create(createNoticeBoardDto: CreateNoticeBoardDto) {
    return this.noticeBoardRepository.save(
      createNoticeBoardDto.toNoticeBoardEntity(),
    );
  }

  find(options: FindManyOptions) {
    return this.noticeBoardRepository.find(options);
  }

  findOne(options: FindOneOptions) {
    return this.noticeBoardRepository.findOne(options);
  }
}
