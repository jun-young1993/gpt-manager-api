import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {VersioningType} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    prefix : 'v',
    defaultVersion : '1'
  });


  await app.listen(
      process.env.APP_PORT || 3000,
      process.env.APP_HOST || '127.0.0.1',
      () => {
        console.log(`[START HTTP APP ] ${process.env.APP_HOST}:${process.env.APP_PORT}`)
      });
}
bootstrap();
