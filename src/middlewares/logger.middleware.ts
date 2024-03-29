import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // private logger = new Logger('HTTP'); // HTTP(context)의 역할 -> HTTP 관련된 요청에서만 logger가 실행 됨 , express의 debug 라이브러리와 같은 역할

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    // const { ip, method, originalUrl, query, body } = request;
    // const userAgent = request.get('user-agent') || ''; // header에서 가져옴

    // 응답이 끝났을 때
    response.on('finish', () => {
     //  const { statusCode } = response;
     //  const contentLength = response.get('content-length');
     //
     //  this.logger.info('[REQUEST]',{
     //     info : `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
     //     query : `${JSON.stringify(query)}`,
     //     body : `${JSON.stringify(body)}`
     // });
    });

    next();
  }
}
