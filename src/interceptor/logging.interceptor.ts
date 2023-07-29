import {Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // console.log(this.logger);
        console.log(this.logger.constructor.name);


        let logger = this.logger;
        if(this.logger.constructor.name === 'WinstonLogger'){

            logger = this.logger['logger'];
        }




        const now = Date.now();
        return next
            .handle()
            .pipe(
                map(data => {
                    const { ip, method, originalUrl, query, body } = context.switchToHttp().getRequest();
                    logger.info('[REQUEST AND RESPONSE]',{
                        message: `
                            requestInfo: 
                                [ip method url] ${ip}, ${method}, ${originalUrl}, 
                                [query] ${JSON.stringify(query)}, 
                                [body] ${JSON.stringify(body)}
                            data: ${JSON.stringify(data)}
                            statusCode: ${context.switchToHttp().getResponse().statusCode}
                            executeTime: ${Date.now()-now} ms
                        `,
                    })
                })
            );
    }
}