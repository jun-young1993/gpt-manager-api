import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';

import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';
import { forwardRef, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  imports: [
    NestRedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: configService.get('redis'),
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => RedisModule),
  ],
  providers: [RedisService, ConfigService],
  exports: [RedisService],
})
export class RedisModule {}
