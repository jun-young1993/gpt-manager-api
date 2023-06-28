import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CreateImageRequest, CreateImageRequestSizeEnum } from 'openai';

export class GenerationImageDto {
  @IsString()
  prompt: CreateImageRequest['prompt'];

  @IsNumber()
  n: CreateImageRequest['n'];

  @IsEnum(CreateImageRequestSizeEnum)
  size: CreateImageRequest['size'];

  toCreateImageRequest(prompt?: string): CreateImageRequest {
    if (prompt !== undefined) {
      this.prompt = prompt;
    }
    return this;
  }
}
