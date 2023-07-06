import { Module } from '@nestjs/common';
import { GoogleTrendsService } from './google-trends.service';
import { GoogleTrendsController } from './google-trends.controller';

import { GoogleTrend } from './entities/google-trend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {GoogleTrendsMappingModule} from "../google-trends-mapping/google-trends-mapping.module";

@Module({
  imports: [TypeOrmModule.forFeature([GoogleTrend]),GoogleTrendsMappingModule],
  controllers: [GoogleTrendsController],
  providers: [GoogleTrendsService],
  exports: [
    GoogleTrendsModule,
    GoogleTrendsService,
    TypeOrmModule.forFeature([GoogleTrend]),
  ],
})
export class GoogleTrendsModule {}
