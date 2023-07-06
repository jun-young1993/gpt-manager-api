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
import { GoogleTrendsMappingService } from './google-trends-mapping.service';
import { CreateGoogleTrendsMappingDto } from './dto/create-google-trends-mapping.dto';
import { UpdateGoogleTrendsMappingDto } from './dto/update-google-trends-mapping.dto';
import { GoogleTrendsMappingFindInterface } from './google-trends-mapping.interface';

@Controller('google-trends-mapping')
export class GoogleTrendsMappingController {
  constructor(
    private readonly googleTrendsMappingService: GoogleTrendsMappingService,
  ) {}

  @Get()
  async findByDate(@Query() query: GoogleTrendsMappingFindInterface) {
    return await this.googleTrendsMappingService.find(query);
  }

  @Get('group/date-geo')
  async getGroupByDateAndGeo() {
    return await this.googleTrendsMappingService.getGroupByDateAndGeo();
  }

  @Post()
  async create(
    @Body() createGoogleTrendsMappingDto: CreateGoogleTrendsMappingDto,
  ) {
    return this.googleTrendsMappingService.create(createGoogleTrendsMappingDto);
  }


}
