import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from './config/config.module';

import { UserModule } from './user/user.module';

import { TypeOrmModule } from './typeorm/typeorm.module';
import { JwtModule } from './jwt/jwt.module';
import { GptModule } from './gpt/gpt.module';
import { ChatModule } from './chat/chat.module';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LoggerModule } from './logger/Logger.module';
import { GoogleTrendsModule } from './google-trends/google-trends.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    RedisModule,
    AuthModule,
    UserModule,
    JwtModule,
    GptModule,
    ChatModule,
    TasksModule,
    LoggerModule,
    GoogleTrendsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    TasksService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
