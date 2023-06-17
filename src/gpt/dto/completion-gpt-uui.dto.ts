import { IsArray, IsEmpty, IsOptional, IsString } from 'class-validator';
import { CreateChatCompletionRequest } from 'openai';

export class CompletionGptUuidDto {

  @IsOptional()
  @IsString()
  model?: string;
  
  @IsString()
  uuid : string

}



