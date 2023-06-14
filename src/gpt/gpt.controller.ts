import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GptService } from './gpt.service';
import { CreateGptDto } from './dto/create-gpt.dto';
import { UpdateGptDto } from './dto/update-gpt.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Get('model')
  async modelList() {
    return await this.gptService.modelList();
  }

  @Get('model/:model')
  async modle(@Param('model') model: string) {
    return await this.gptService.getModel(model);
  }

  @Post('completions')
  async completions(
    @Body() 
  ){

  }
}
