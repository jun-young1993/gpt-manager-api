import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { GoogleTrendsService } from './google-trends.service';
import { CreateGoogleTrendDto } from './dto/create-google-trend.dto';
import {
  GoogleGeoCode,
  GoogleTrendFindOption,
} from './google-trends.interface';

@Controller('google-trends')
export class GoogleTrendsController {
  constructor(private readonly googleTrendsService: GoogleTrendsService) {}

  @Get('')
  async find(@Query() query: GoogleTrendFindOption) {
    return await this.googleTrendsService.find(query);
  }

  @Get('daily/:geo')
  async daily(@Param('geo') geo: GoogleGeoCode) {
    console.log('geo', geo);
    return await this.googleTrendsService.daily(geo);
  }

  @Get('daily/:geo/:date')
  async dailyByDate(
    @Param('geo') geo: GoogleGeoCode,
    @Param('date') date: string,
  ) {
    console.log('daily/:geo/:date', geo, date);
    return await this.googleTrendsService.daily(geo, date);
  }

  @Get('geo/:geo')
  async geo(@Param('geo') geo: GoogleGeoCode) {
    return await this.googleTrendsService.getDailyTrendsByGeo(geo);
  }

  @Post('')
  async create(@Body() createGoogleTrendDto: CreateGoogleTrendDto) {
    return await this.googleTrendsService.create(createGoogleTrendDto);
  }
}
