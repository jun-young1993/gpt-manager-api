import { PartialType } from '@nestjs/mapped-types';
import { CreateCodeItemDto } from './create-code-item.dto';

export class UpdateCodeItemDto extends PartialType(CreateCodeItemDto) {}
