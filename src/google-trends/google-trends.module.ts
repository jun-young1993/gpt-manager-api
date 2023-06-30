import { Module } from '@nestjs/common';
import { GoogleTrendsService } from './google-trends.service';
import { GoogleTrendsController } from './google-trends.controller';

import { GoogleTrend } from './entities/google-trend.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleTrend])],
  controllers: [GoogleTrendsController],
  providers: [GoogleTrendsService],
  exports: [
    GoogleTrendsModule,
    GoogleTrendsService,
    TypeOrmModule.forFeature([GoogleTrend]),
  ],
})
export class GoogleTrendsModule {}
