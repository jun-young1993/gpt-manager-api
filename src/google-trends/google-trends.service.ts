import { Injectable } from '@nestjs/common';
import * as googleTrends from 'google-trends-api';
import * as moment from 'moment';
import GoogleTrendsDailyInterface, { GoogleTrendFindOption } from './google-trends.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleTrend } from './entities/google-trend.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { CreateGoogleTrendDto } from './dto/create-google-trend.dto';
@Injectable()
export class GoogleTrendsService {
  constructor(
    @InjectRepository(GoogleTrend)
    private readonly googleTrendRepository: Repository<GoogleTrend>,
  ) {}
  async daily(): Promise<GoogleTrendsDailyInterface> {
    return new Promise(function (resolve, reject) {
      googleTrends.dailyTrends(
        {
          trendDate: moment().format('YYYY-MM-DD'),
          geo: 'KR',
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

  findManyOptionParse({
    start_date,
    end_date,
    title,
    article_content,
  }: GoogleTrendFindOption): FindManyOptions<GoogleTrend> {
    return {
      where: {
        ...(title ? { title: title } : {}),
        ...(article_content ? { articleContent: article_content } : {}),
        ...(start_date && end_date
          ? {
              createdAt: Between(
                new Date(`${start_date} 00:00:00`),
                new Date(`${end_date} 23:59:59`),
              ),
            }
          : {}),
      },
    };
  }

  async find(options: GoogleTrendFindOption) {
    return await this.googleTrendRepository.find(
      this.findManyOptionParse(options),
    );
  }
}
