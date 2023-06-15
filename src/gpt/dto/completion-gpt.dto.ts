import { IsArray, IsEmpty, IsOptional, IsString } from 'class-validator';
import { CreateChatCompletionRequest } from 'openai';

export class CompletionGptDto {

  @IsOptional()
  @IsString()
  model?: string;
  
  @IsArray()
  messages: CreateChatCompletionRequest['messages'];
}
