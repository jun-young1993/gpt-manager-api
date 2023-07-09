import { Injectable } from '@nestjs/common';
import * as googleTrends from 'google-trends-api';
import * as moment from 'moment';
import GoogleTrendsDailyInterface, {
  GoogleGeoCode,
  GoogleTrendFindOption,
} from './google-trends.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleTrend } from './entities/google-trend.entity';
import {
  Between,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CreateGoogleTrendDto } from './dto/create-google-trend.dto';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';

@Injectable()
export class GoogleTrendsService {
  constructor(
    @InjectRepository(GoogleTrend)
    private readonly googleTrendRepository: Repository<GoogleTrend>,
  ) {}
  async daily(
    geo: GoogleGeoCode,
    date?: string,
  ): Promise<GoogleTrendsDailyInterface> {
    return new Promise(function (resolve, reject) {
      googleTrends.dailyTrends(
        {
          trendDate: date ?? moment().format('YYYY-MM-DD'),
          geo: geo,
        },
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(results));
          }
        },
      );
    });
  }

  async create(
    createGoogleTrendDto: CreateGoogleTrendDto,
  ): Promise<GoogleTrend> {
    return await this.googleTrendRepository.save(
      createGoogleTrendDto.toGoogleTrendEntity(),
    );
  }

  async getOne(options: FindOneOptions): Promise<GoogleTrend> {
    return await this.googleTrendRepository.findOne(options);
  }

  findManyOptionParse({
    mapping_id,
  }: GoogleTrendFindOption): FindManyOptions<GoogleTrend> {
    return {
      where: {
        isDeleted: IS_DELETED.N,
        ...(mapping_id ? { mapping_id: mapping_id } : {}),
        // ...(title ? { title: title } : {}),
        // ...(article_content ? { articleContent: article_content } : {}),
        // ...(type ? { type: type } : {}),
        // ...(start_date && end_date
        //   ? {
        //       createdAt: Between(
        //         new Date(`${start_date} 00:00:00`),
        //         new Date(`${end_date} 23:59:59`),
        //       ),
        //     }
        //         : {}
        // ),
      },
    };
  }

  async getDailyTrendsByGeo(geo: GoogleGeoCode) {
    return await this.googleTrendRepository.find(
      this.findManyOptionParse({
        geo: geo,
      }),
    );
  }

  async find(options: GoogleTrendFindOption) {
    return await this.googleTrendRepository.find(
      this.findManyOptionParse(options),
    );
  }

  async findOne(options: GoogleTrendFindOption) {
    return await this.googleTrendRepository.findOne(
      this.findManyOptionParse(options),
    );
  }

  async delete(options: GoogleTrendFindOption) {
    return await this.googleTrendRepository.update(
      this.findManyOptionParse(options).where as FindOptionsWhere<GoogleTrend>,
      {
        isDeleted: IS_DELETED.Y,
      },
    );
  }

  getRepository(){
    return this.googleTrendRepository;
  }
}
