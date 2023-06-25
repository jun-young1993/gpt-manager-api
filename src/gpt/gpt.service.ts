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

  async generationsImages(){
    // 256x256, 512x512, or 1024x1024.
    const openai = this.getOpenai();
    const response = await openai.createImage({
      prompt: "제목은 'gptContent' 이고 역할은  ai 이야 마크 만들어줘",
      n: 2,
      size: "256x256",
    })

    const {data, status} = response;
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
