import { Module } from '@nestjs/common';
import { GoogleTrendsMappingService } from './google-trends-mapping.service';
import { GoogleTrendsMappingController } from './google-trends-mapping.controller';

@Module({
  controllers: [GoogleTrendsMappingController],
  providers: [GoogleTrendsMappingService]
})
export class GoogleTrendsMappingModule {}
