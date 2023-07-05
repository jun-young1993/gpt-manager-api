import { Module } from '@nestjs/common';
import { GoogleTrendsMappingService } from './google-trends-mapping.service';
import { GoogleTrendsMappingController } from './google-trends-mapping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleTrendsMapping } from './entities/google-trends-mapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleTrendsMapping])],
  controllers: [GoogleTrendsMappingController],
  providers: [GoogleTrendsMappingService],
  exports: [
    GoogleTrendsMappingModule,
    GoogleTrendsMappingService,
    TypeOrmModule.forFeature([GoogleTrendsMapping]),
  ],
})
export class GoogleTrendsMappingModule {}
