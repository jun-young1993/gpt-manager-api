import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {ConfigModule} from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import {RedisService} from "../redis/redis.service";
@Module({
  imports : [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService,MailService, RedisService]
})
export class AuthModule {}
