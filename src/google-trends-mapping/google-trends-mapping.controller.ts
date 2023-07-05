import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoogleTrendsMappingService } from './google-trends-mapping.service';
import { CreateGoogleTrendsMappingDto } from './dto/create-google-trends-mapping.dto';
import { UpdateGoogleTrendsMappingDto } from './dto/update-google-trends-mapping.dto';

@Controller('google-trends-mapping')
export class GoogleTrendsMappingController {
  constructor(
    private readonly googleTrendsMappingService: GoogleTrendsMappingService,
  ) {}

  @Post()
  async create(@Body() createGoogleTrendsMappingDto: CreateGoogleTrendsMappingDto) {
    return this.googleTrendsMappingService.create(createGoogleTrendsMappingDto);
  }

}
