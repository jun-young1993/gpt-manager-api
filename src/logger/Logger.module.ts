import { Module } from '@nestjs/common';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(process.env.APP_NAME, {
              prettyPrint: true,
            }),
          ),
        }),
        new winstonDaily({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.printf(
              (info) =>
                `[${info.timestamp}] ${process.env.APP_NAME}.${info.level}: ${info.message}`,
            ),
          ),
          dirname: process.env.LOG_DIR,
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new winstonDaily({
		level: 'error',
		format: winston.format.combine(
		  winston.format.timestamp({
		    format: 'YYYY-MM-DD HH:mm:ss',
		  }),
		  winston.format.printf(
		    (info) =>
		      `[${info.timestamp}] ${process.env.APP_NAME}.${info.level}: ${info.message}`,
		  ),
		),
		dirname: process.env.LOG_DIR,
		filename: 'error.%DATE%.log',
		datePattern: 'YYYY-MM-DD',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '14d',
	}),
      ],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
