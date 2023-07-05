import {IsEnum, IsOptional, IsString} from 'class-validator';
import { GoogleTrend } from '../entities/google-trend.entity';
import { GoogleGeoCode, GoogleTrendTypes } from '../google-trends.interface';

export class CreateGoogleTrendDto {
  @IsString()
  id:string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  articleContent: string;

  @IsString()
  url: string


  toGoogleTrendEntity(): GoogleTrend {
    return GoogleTrend.createFromDto(this);
  }
}
