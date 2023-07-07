import { IsOptional, IsString } from 'class-validator';
import { GoogleTrend } from '../entities/google-trend.entity';

export class CreateGoogleTrendDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  articleContent: string;

  @IsString()
  url: string;

  toGoogleTrendEntity(): GoogleTrend {
    return GoogleTrend.createFromDto(this);
  }
}
