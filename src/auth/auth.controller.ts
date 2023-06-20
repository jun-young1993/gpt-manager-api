import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req, HttpException, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';

import {UpdateAuthDto} from './dto/update-auth.dto';
import {ConfigService} from '@nestjs/config';
import {MailService} from 'src/mail/mail.service';
import {v4} from "uuid";
import {Response, Request} from 'express';
import {MailAuthDto} from './dto/mail-auth.dto';
import {RedisService} from "../redis/redis.service";
import {RealIP, RealIp} from "nestjs-real-ip";
import {LoginAuthDto} from "./dto/login-auth.dto";
import {CheckAuthDto} from "./dto/check-auth.dto";



@Controller('auth')
export class AuthController {
    private readonly redisTTl: number

    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
        private readonly redisService: RedisService
    ) {
        this.redisTTl = this.configService.get<number>('redis.ttl');
    }

    @Post('mail')
    async sendAuth(
        @Body() {email}: MailAuthDto,
        @RealIP() ip: string,
        @Res() res: Response
    ) {
        const mailerOptions = this.configService.get('mailer');
        const appProtocol = this.configService.get<string>('app.protocol');
        const appPort = this.configService.get<string>('app.port');
        const appDomain = this.configService.get<string>('app.domain');
        const appIp = this.configService.get<string>('app.host');
        const loginUrl: string = `${appProtocol}://${appDomain ?? appIp}:${appDomain ? "" : appPort}/v1/auth/login`;
            console.log('login Url',loginUrl);
        const {accepted} = await this.mailService.sendLoginCode(
            mailerOptions,
            email,
            {
                subject: '로그인 인증 메일',
                html: `
          " 로그인 확인" 버튼를 누르시면 로그인 인증이 완료됩니다.
            접속 IP : ${ip}
            <br/>
            <form arget="_self" action=${loginUrl} method="POST">
                <input name="email" id="email" type="hidden" value=${email} />
                <input
                        type="submit",
                        value="로그인 확인",
                        style="
                            align-items: center;
                            background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
                            border: 0;
                            border-radius: 8px;
                            box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
                            box-sizing: border-box;
                            color: #FFFFFF;
                            display: flex;
                            font-family: Phantomsans, sans-serif;
                            font-size: 20px;
                            justify-content: center;
                            line-height: 1em;
                            max-width: 100%;
                            min-width: 140px;
                            padding: 19px 24px;
                            text-decoration: none;
                            user-select: none;
                            -webkit-user-select: none;
                            touch-action: manipulation;
                            white-space: nowrap;
                            cursor: pointer;
                        "
                />
            </form>
          `,
            }
        );

        const redisSet = await this.redisService.set(email, ip, this.redisTTl)

        res.status(HttpStatus.OK).json({
            accepted: accepted,
            cache: {
                status: redisSet,
                ttl: this.redisTTl
            },
        })
    }

    
    @Post('login')
    async login(
        @Body() {email} : LoginAuthDto,
        @RealIP() ip: string,
        @Res() res: Response
    ) {
        

        const authIp: string | null = await this.redisService.get(email);

        if (authIp === null)
            throw new HttpException('NO_CONTENT', HttpStatus.NO_CONTENT);


        // if (authIp === ip) {
            const redisSet = await this.redisService.set(email,email);
            return res.status(HttpStatus.OK).json({
                cache: {
                    status: redisSet
                }
            })

        // }

        throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR)


    }

    @Post('check')
    async check(
        @Body() {email} : CheckAuthDto,
        @Res() res: Response
    ) {

        
        
        
        const authEmail: string | null = await this.redisService.get(email);
        
        if (authEmail === null)
            throw new HttpException('NO_CONTENT', HttpStatus.NO_CONTENT);




        if (authEmail === email) {
            const redisSet = await this.redisService.delete(email);
            const cookie = await this.authService.getCookieWithJwtToken(email);
            res.setHeader('Set-Cookie',cookie);
            return res.status(HttpStatus.OK).json({
                cache: {
                    status: redisSet
                },
            })
        }else{
            throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN)
        }

        throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR)


    }

}
