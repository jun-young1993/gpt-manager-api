import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GoogleTrendsService } from './google-trends.service';
import { CreateGoogleTrendDto } from './dto/create-google-trend.dto';
import { UpdateGoogleTrendDto } from './dto/update-google-trend.dto';

@Controller('google-trends')
export class GoogleTrendsController {
  constructor(private readonly googleTrendsService: GoogleTrendsService) {}
  @Get('daily')
  async daily() {
    return await this.googleTrendsService.daily();
  }

}
