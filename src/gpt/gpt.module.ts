import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';
import { RedisService } from '../redis/redis.service';

@Module({
  controllers: [GptController],
  providers: [GptService, RedisService],
  exports: [GptModule, GptService],
})
export class GptModule {}
