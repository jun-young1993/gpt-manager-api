import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  Configuration,
  CreateChatCompletionRequest,
  CreateCompletionRequest,
  OpenAIApi,
} from 'openai';
import { GenerationImageDto } from './dto/generation-image.dto';

@Injectable()
export class GptService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

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

  async generationsImages(generationImageDto: GenerationImageDto) {
    // 256x256, 512x512, or 1024x1024.
    const openai = this.getOpenai();
    const response = await openai.createImage(
      generationImageDto.toCreateImageRequest(),
    );

    const { data, status } = response;
    console.log(data, status);
    return data;
  }

  async createCompletion(createCompletionRequest: CreateCompletionRequest) {
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
