import { Injectable } from '@nestjs/common';
import { CreateGoogleTrendsMappingDto } from './dto/create-google-trends-mapping.dto';
import { UpdateGoogleTrendsMappingDto } from './dto/update-google-trends-mapping.dto';
import { GoogleTrendsMapping } from './entities/google-trends-mapping.entity';
import {FindOneOptions, FindOptionsWhere, Repository} from 'typeorm';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleTrendsMappingFindInterface } from './google-trends-mapping.interface';
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

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

  async find(query: GoogleTrendsMappingFindInterface) {
    return await this.googleTrendsMappingRepository.find({
      where: query,
    });
  }

  async update(query:FindOptionsWhere<GoogleTrendsMapping>, trendEntity:  QueryDeepPartialEntity<GoogleTrendsMapping>){
    return await this.googleTrendsMappingRepository.update(query,trendEntity);
  }

  getRepository(){
    return this.googleTrendsMappingRepository;
  }

  async findOne(options: FindOneOptions) {
    return await this.googleTrendsMappingRepository.findOne(options);
  }

  async findOrCreate(options: FindOneOptions['where']) {
    const googleTrendsMapping = await this.findOne({
      where: options,
    });
    if (googleTrendsMapping === null) {
      const googleTrendMappingDto = new CreateGoogleTrendsMappingDto();

      return await this.create(Object.assign(googleTrendMappingDto, options));
    }

    return googleTrendsMapping;
  }

  async getGroupByDateAndGeo() {
    return await this.googleTrendsMappingRepository
      .createQueryBuilder('google_trends_mapping')
      .select('date')
      .addSelect('geo')
      .groupBy('date')
      .addGroupBy('geo')
      .getRawMany();
  }

  async getGroupByDateAndGeoAndTitle() {
    return await this.googleTrendsMappingRepository
        .createQueryBuilder('google_trends_mapping')
        .select('date')
        .addSelect('geo')
        .addSelect('title')
        .groupBy('date')
        .addGroupBy('geo')
        .addGroupBy('title')
        .getRawMany();
  }
}
