import { PartialType } from '@nestjs/mapped-types';
import { CreateGoogleTrendDto } from './create-google-trend.dto';

export class UpdateGoogleTrendDto extends PartialType(CreateGoogleTrendDto) {}
