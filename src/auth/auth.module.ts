import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {ConfigModule} from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import {RedisService} from "../redis/redis.service";
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

import {  JwtService } from '@nestjs/jwt';
import { JwtModule } from 'src/jwt/jwt.module';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports : [ConfigModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService,MailService, RedisService]
})
export class AuthModule {}
