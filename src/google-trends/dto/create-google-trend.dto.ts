import { IsEnum, IsString } from 'class-validator';
import { GoogleTrend } from '../entities/google-trend.entity';
import {GoogleGeoCode, GoogleTrendTypes} from '../google-trends.interface';

export class CreateGoogleTrendDto {
  @IsString()
  title: string;

  @IsString()
  articleContent: string;

  @IsString()
  @IsEnum(GoogleTrendTypes)
  type: GoogleTrendTypes;

  @IsString()
  geo: GoogleGeoCode

  toGoogleTrendEntity(): GoogleTrend {
    return GoogleTrend.createFromDto(this);
  }
}
