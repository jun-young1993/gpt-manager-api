import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CodeItem } from '../entities/code-item.entity';

export class CreateCodeItemDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  code: number;

  toCodeItemEntity(): CodeItem {
    return CodeItem.codeItemFromCreateDto(this);
  }
}
