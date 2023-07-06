import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {GoogleTrendsService} from './google-trends.service';
import {CreateGoogleTrendDto} from './dto/create-google-trend.dto';
import {GoogleGeoCode, GoogleTrendFindOption,} from './google-trends.interface';
import {GoogleTrendsMappingService} from "../google-trends-mapping/google-trends-mapping.service";
import {IS_DELETED} from "../typeorm/typeorm.interface";

@Controller('google-trends')
export class GoogleTrendsController {
  constructor(
      private readonly googleTrendsService: GoogleTrendsService,
      private readonly googleTrendsMappingService: GoogleTrendsMappingService
  ) {}

  @Get('')
  async find(@Query() query: GoogleTrendFindOption) {
    return await this.googleTrendsService.find(query);
  }

  @Get('mapping/:id')
  async indexByMappingId(@Param('id') id:string){
    console.log('id',id)
    return await this.googleTrendsService.find({
      id: id
    })
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
