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
import {CreateChatCompletionRequest, CreateCompletionRequest} from 'openai';
import {CompletionGptDto, GptCompletionGptDto} from './dto/completion-gpt.dto';

// https://platform.openai.com/docs/api-reference/completions/create?lang=node.js
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

  @Post('chat/completions')
  async createChatCompletion(@Body() { model, messages }: CompletionGptDto) {
    console.log({
      model: model ?? 'gpt-3.5-turbo',
      messages,
    });
    return await this.gptService.createChatCompletion({
      model: model ?? 'gpt-3.5-turbo',
      messages,
    } as unknown as CreateChatCompletionRequest);
  }

  @Post('chat/gpt-completions')
  async createCompletion(@Body() {model, prompt} : GptCompletionGptDto) {
    const createCompletionRequest : CreateCompletionRequest  = {
      model : model ?? "text-davinci-003",
      prompt,
      max_tokens : 100,
      temperature: 0,
    }
    return await this.gptService.createCompletion(createCompletionRequest);
  }
}
