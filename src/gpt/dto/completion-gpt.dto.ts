import {IsArray, IsEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { CreateChatCompletionRequest } from 'openai';

export class CompletionGptDto {

  @IsOptional()
  @IsString()
  model?: string;
  
  @IsArray()
  messages: CreateChatCompletionRequest['messages'];
}

export class GptCompletionGptDto {
  @IsOptional()
  @IsString()
  model?: string;

  @IsString()
  prompt : string;

  @IsOptional()
  @IsNumber()
  max_tokens?: number
}

