import { Injectable } from '@nestjs/common';
import { CreateGptDto } from './dto/create-gpt.dto';
import { UpdateGptDto } from './dto/update-gpt.dto';
import { ConfigService } from '@nestjs/config';
import {Configuration, CreateChatCompletionRequest, CreateCompletionRequest, OpenAIApi} from 'openai';

@Injectable()
export class GptService {
  constructor(private readonly configService: ConfigService) {}

  async modelList() {
    const openai = this.getOpenai();
    const response = await openai.listEngines();
    const { data, status } = response;
    return data;
  }

  async getModel(model: string) {
    const openai = this.getOpenai();
    const response = await openai.retrieveModel(model);
    const { data, status } = response;
    return data;
  }

  async createChatCompletion(
    createChatCompletionRequest: CreateChatCompletionRequest,
  ) {
    const openai = this.getOpenai();
    const response = await openai.createChatCompletion(
      createChatCompletionRequest,
    );
    const { data, status } = response;
    return data;
  }

  async createCompletion(createCompletionRequest : CreateCompletionRequest){
    const openai = this.getOpenai();
    const response = await openai.createCompletion(createCompletionRequest);
    const { data, status } = response;
    return data;
  }

  private config() {
    return this.configService.get<Configuration>('gpt.config');
  }

  private getOpenai(): OpenAIApi {
    const configuration = this.config();

    const openai = new OpenAIApi(configuration);
    return openai;
  }
}
