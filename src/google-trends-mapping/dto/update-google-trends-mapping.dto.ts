import { PartialType } from '@nestjs/mapped-types';
import { CreateGoogleTrendsMappingDto } from './create-google-trends-mapping.dto';

export class UpdateGoogleTrendsMappingDto extends PartialType(CreateGoogleTrendsMappingDto) {}
