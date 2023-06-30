import { IsEnum, IsString } from 'class-validator';
import { GoogleTrend } from '../entities/google-trend.entity';
import { GoogleTrendTypes } from '../google-trends.interface';

export class CreateGoogleTrendDto {
  @IsString()
  title: string;

  @IsString()
  articleContent: string;

  @IsString()
  @IsEnum(GoogleTrendTypes)
  type: GoogleTrendTypes;

  toGoogleTrendEntity(): GoogleTrend {
    return GoogleTrend.createFromDto(this);
  }
}
