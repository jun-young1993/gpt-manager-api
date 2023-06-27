import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GptService } from './gpt.service';
import { CreateChatCompletionRequest, CreateCompletionRequest } from 'openai';
import {
  CompletionGptDto,
  GptCompletionGptDto,
} from './dto/completion-gpt.dto';
import { CompletionGptUuidDto } from './dto/completion-gpt-uui.dto';
import { RedisService } from '../redis/redis.service';
import { GenerationImageDto } from './dto/generation-image.dto';

// https://platform.openai.com/docs/api-reference/completions/create?lang=node.js
@Controller('gpt')
export class GptController {
  constructor(
    private readonly gptService: GptService,
    private readonly redisService: RedisService,
  ) {}

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
  async createCompletion(@Body() { model, prompt }: GptCompletionGptDto) {
    const createCompletionRequest: CreateCompletionRequest = {
      model: model ?? 'text-davinci-003',
      prompt,
      max_tokens: 100,
      temperature: 0,
    };
    return await this.gptService.createCompletion(createCompletionRequest);
  }

  @Post('uuid/completions')
  async createChatUuidCompletion(
    @Body() { uuid, model }: CompletionGptUuidDto,
  ) {
    console.log({
      model: model ?? 'gpt-3.5-turbo',
      uuid,
    });
    const data: string = await this.redisService.get(uuid);
    console.log('data', data);
    const chates = JSON.parse(data).map(({ role, content }) => {
      return {
        role: role,
        content: content,
      };
    });

    console.log('chats', chates);
    const result = await this.gptService.createChatCompletion({
      model: model ?? 'gpt-3.5-turbo',
      messages: [
        // { "role" : "system", "content": "한국어로 대답해줘" },
        ...chates,
      ],
    } as unknown as CreateChatCompletionRequest);
    const { role, content } = result.choices[0].message;

    const replyChates = {
      order: chates.length + 1,
      uuid,
      content,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.redisService.push(uuid, replyChates);
    return replyChates;
  }

  @Post('generations/images')
  async generationsImages(@Body() generationImage: GenerationImageDto) {
    return await this.gptService.generationsImages(generationImage);
  }

  @Get('completions/:uuid')
  async getChatUuidCompletion(@Param('uuid') uuid: string) {
    const data = await this.redisService.get(uuid);
    console.log(data, uuid);
    return JSON.parse(await this.redisService.get(uuid));
  }
}
