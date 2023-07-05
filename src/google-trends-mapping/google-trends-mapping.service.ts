import { Injectable } from '@nestjs/common';
import { CreateGoogleTrendsMappingDto } from './dto/create-google-trends-mapping.dto';
import { UpdateGoogleTrendsMappingDto } from './dto/update-google-trends-mapping.dto';

@Injectable()
export class GoogleTrendsMappingService {
  create(createGoogleTrendsMappingDto: CreateGoogleTrendsMappingDto) {
    return 'This action adds a new googleTrendsMapping';
  }

  findAll() {
    return `This action returns all googleTrendsMapping`;
  }

  findOne(id: number) {
    return `This action returns a #${id} googleTrendsMapping`;
  }

  update(id: number, updateGoogleTrendsMappingDto: UpdateGoogleTrendsMappingDto) {
    return `This action updates a #${id} googleTrendsMapping`;
  }

  remove(id: number) {
    return `This action removes a #${id} googleTrendsMapping`;
  }
}
