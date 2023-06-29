import { Module } from '@nestjs/common';
import { GoogleTrendsService } from './google-trends.service';
import { GoogleTrendsController } from './google-trends.controller';

@Module({
  controllers: [GoogleTrendsController],
  providers: [GoogleTrendsService, GoogleTrendsService],
  exports: [GoogleTrendsModule, GoogleTrendsService],
})
export class GoogleTrendsModule {}
