import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CreateImageRequest, CreateImageRequestSizeEnum } from 'openai';

export class GenerationImageDto {
  @IsString()
  prompt: CreateImageRequest['prompt'];

  @IsNumber()
  n: CreateImageRequest['n'];

  @IsEnum(CreateImageRequestSizeEnum)
  size: CreateImageRequest['size'];

  toCreateImageRequest(): CreateImageRequest {
    return this;
  }
}
