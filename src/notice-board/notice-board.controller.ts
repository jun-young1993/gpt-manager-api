import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NoticeBoardService } from './notice-board.service';
import { CreateNoticeBoardDto } from './dto/create-notice-board.dto';
import { UpdateNoticeBoardDto } from './dto/update-notice-board.dto';

@Controller('notice-board')
export class NoticeBoardController {
  constructor(private readonly noticeBoardService: NoticeBoardService) {}

  @Get()
  find(){
    return this.noticeBoardService.find({});
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.noticeBoardService.findOne({
      where: {
        id: Number(id)
      }
    });
  }

  @Post()
  create(@Body() createNoticeBoardDto: CreateNoticeBoardDto) {
    return this.noticeBoardService.create(createNoticeBoardDto);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.noticeBoardService.find({
      where: {
        category: category,
      },
      order: {
        id: "DESC",
      },
    });
  }


}
