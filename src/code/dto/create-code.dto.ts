import { IsOptional, IsString } from 'class-validator';
import { Code } from '../entities/code.entity';

export class CreateCodeDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  toCodeEntity(): Code {
    return Code.codeFromCreateDto(this);
  }
}
