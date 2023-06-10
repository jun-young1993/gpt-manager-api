import { Module, ValidationPipe } from "@nestjs/common";

import { APP_PIPE } from "@nestjs/core";
import { AuthModule } from './auth/auth.module';
import  {RedisModule}  from './redis/redis.module';
import  {ConfigModule}  from './config/config.module';
import {TypeOrmModule} from './typeorm/typeorm.module';

import configuration from "./config/configuration";

import {ConfigService} from "@nestjs/config";




@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    RedisModule,
    AuthModule,
  ],
  providers: [{
    provide: APP_PIPE,
    useValue : new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  }],
})
export class AppModule {}