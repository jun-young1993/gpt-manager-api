import { Injectable } from '@nestjs/common';
import * as googleTrends from 'google-trends-api';
import * as moment from 'moment';
import GoogleTrendsDailyInterface from './google-trends.interface';
@Injectable()
export class GoogleTrendsService {
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
}
