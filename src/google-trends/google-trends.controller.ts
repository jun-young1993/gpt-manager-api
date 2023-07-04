import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GoogleTrendsService } from './google-trends.service';
import { CreateGoogleTrendDto } from './dto/create-google-trend.dto';
import { UpdateGoogleTrendDto } from './dto/update-google-trend.dto';
import { Between } from 'typeorm';
import {GoogleGeoCode, GoogleTrendFindOption} from './google-trends.interface';

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

  @Post('')
  async create(@Body() createGoogleTrendDto: CreateGoogleTrendDto) {
    return await this.googleTrendsService.create(createGoogleTrendDto);
  }


}
