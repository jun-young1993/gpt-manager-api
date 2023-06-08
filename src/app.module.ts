import { Module, ValidationPipe } from "@nestjs/common";

import { APP_PIPE } from "@nestjs/core";

import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import configuration from "./config/configuration";




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load : [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      useFactory : (configService : ConfigService) => ({
        logging : true,
        type: configService.get<string>('db.type'),
        host: configService.get<string>('db.host'),
        port: configService.get<string>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        entities : ["dist/**/*.entity{.ts,.js}"],
        synchronize : true
      } as TypeOrmModuleOptions),
      inject: [ConfigService]
    }),
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