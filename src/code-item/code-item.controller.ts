import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CodeItemService } from './code-item.service';
import { CreateCodeItemDto } from './dto/create-code-item.dto';
import { UpdateCodeItemDto } from './dto/update-code-item.dto';

@Controller('code-item')
export class CodeItemController {
  constructor(private readonly codeItemService: CodeItemService) {}

  @Post()
  create(@Body() createCodeItemDto: CreateCodeItemDto) {
    return this.codeItemService.create(createCodeItemDto);
  }

  @Get(':code')
  async findOneByCode(@Param('code') code: string) {
    return await this.codeItemService.findOneByCode(code);
  }

  @Get(':code/:key')
  async findOneByCodeAndKey(
    @Param('code') code: string,
    @Param('key') key: string,
  ) {
    return await this.codeItemService.findOneByCodeAndKey(code, key);
  }
}
