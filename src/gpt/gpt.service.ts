import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  Configuration,
  CreateChatCompletionRequest,
  CreateCompletionRequest,
  OpenAIApi,
} from 'openai';
import { GenerationImageDto } from './dto/generation-image.dto';
import { Logger } from 'winston';

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
    this.logger.info(
      `[createChatCompletion: params]`,
      createChatCompletionRequest,
    );

    const openai = this.getOpenai();
    const response = await openai.createChatCompletion(
      createChatCompletionRequest,
    );
    const { data, status } = response;
    this.logger.info('[createChatCompletion: result]', data, status);
    return data;
  }

  async generationsImages(generationImageDto: GenerationImageDto) {
    const completion = await this.createCompletion({
      model: 'text-davinci-003',
      prompt: `Translate the sentence '${generationImageDto.prompt}' into English`,
      max_tokens: 100,
      temperature: 0,
    } as CreateCompletionRequest);
    this.logger.info('[GENERATIONS IMAGES]', completion);
    // 256x256, 512x512, or 1024x1024.
    const openai = this.getOpenai();
    const response = await openai.createImage(
      generationImageDto.toCreateImageRequest(completion?.choices[0].text),
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
