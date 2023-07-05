import { Injectable } from '@nestjs/common';
import { CreateGoogleTrendsMappingDto } from './dto/create-google-trends-mapping.dto';
import { UpdateGoogleTrendsMappingDto } from './dto/update-google-trends-mapping.dto';
import { GoogleTrendsMapping } from './entities/google-trends-mapping.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GoogleTrendsMappingService {
  constructor(
    @InjectRepository(GoogleTrendsMapping)
    private readonly googleTrendsMappingRepository: Repository<GoogleTrendsMapping>,
  ) {}

  async create(createGoogleTrendsMappingDto: CreateGoogleTrendsMappingDto) {
    return await this.googleTrendsMappingRepository.save(
      createGoogleTrendsMappingDto.toGoogleTrendsMappingEntity(),
    );
  }

  async findOne(options: FindOneOptions) {
    return await this.googleTrendsMappingRepository.findOne(options);
  }
}
