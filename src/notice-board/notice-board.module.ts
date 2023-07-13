import { Module } from '@nestjs/common';
import { NoticeBoardService } from './notice-board.service';
import { NoticeBoardController } from './notice-board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeBoard } from './entities/notice-board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeBoard])],
  controllers: [NoticeBoardController],
  providers: [NoticeBoardService],
  exports: [NoticeBoardModule],
})
export class NoticeBoardModule {}
