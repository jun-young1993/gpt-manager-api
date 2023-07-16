import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query,
} from '@nestjs/common';
import { NoticeBoardService } from './notice-board.service';
import { CreateNoticeBoardDto } from './dto/create-notice-board.dto';
import { UpdateNoticeBoardDto } from './dto/update-notice-board.dto';
import {FindManyOptions, FindOptionsOrder} from "typeorm";
import {NoticeBoard, NoticeBoardColumn} from "./entities/notice-board.entity";
import {FindOptionsOrderValue} from "typeorm/find-options/FindOptionsOrder";

@Controller('notice-board')
export class NoticeBoardController {
  constructor(private readonly noticeBoardService: NoticeBoardService) {}

  @Get()
  find(){
    return this.noticeBoardService.find({});
  }

  @Get('latest')
  findLatest(@Query() query){




    return this.noticeBoardService.find({
      order: {
        id: "desc"
      },
      take: 5
    });
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
