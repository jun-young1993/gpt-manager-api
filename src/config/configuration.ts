import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { RedisModuleOptions } from '@liaoliaots/nestjs-redis/dist/redis/interfaces/redis-module-options.interface';
import { Configuration } from 'openai';

export default () =>
  ({
    db: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
    },
    mailer: {
      host: process.env.NODEMAILER_HOST,
      port: Number(process.env.NODEMAILER_PORT),
      service: process.env.NODEMAILER_SERVICE,
      secure: process.env.NODEMAILER_SECURE,
      requireTLS: process.env.NODEMAILER_REQUIRE_TLS,
      debug: Boolean(process.env.NODEMAILER_DEBUG),
      logger: Boolean(process.env.NODEMAILER_LOGGER),
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      ttl: process.env.REDIS_TTL ? Number(process.env.REDIS_TTL) : Number(300)
    },
    app: {
      protocol: process.env.APP_PROTOCOL,
      host: process.env.APP_HOST,
      port: process.env.APP_PORT,
      domain: process.env.APP_DOMAIN ?? process.env.APP_HOST,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiration_time: process.env.JWT_EXPIRATION_TIME,
    },
    gpt: {
      config: new Configuration({
        organization: process.env.GPT_ORG,
        apiKey: process.env.GPT_SECRET,
      }),
    },
  } as unknown as {
    db: TypeOrmModuleOptions;
    mailer?: string | SMTPTransport | SMTPTransport.Options;
    redis: RedisModuleOptions;
    jwt: { secret: string; expiration_time: string };
    gpt: { config: Configuration };
  });
