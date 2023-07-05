import { IsEnum, IsString } from 'class-validator';
import {
  GoogleGeoCode,
  GoogleTrendTypes,
} from 'src/google-trends/google-trends.interface';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';
import { GoogleTrendsMapping } from '../entities/google-trends-mapping.entity';

export class CreateGoogleTrendsMappingDto {
  @IsString()
  public title: string;

  @IsString()
  @IsEnum(GoogleTrendTypes)
  public type: GoogleTrendTypes;

  @IsString()
  public geo: GoogleGeoCode;

  @IsString()
  public date: string;

  @IsEnum(IS_DELETED)
  public isDeleted: IS_DELETED;

  toGoogleTrendsMappingEntity(): GoogleTrendsMapping {
    return GoogleTrendsMapping.createFromDto(this);
  }
}
