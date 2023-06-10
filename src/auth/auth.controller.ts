import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req} from '@nestjs/common';
import { AuthService } from './auth.service';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { v4 } from "uuid";
import { Response,Request } from 'express';
import { MailAuthDto } from './dto/mail-auth.dto';
import {RedisService} from "../redis/redis.service";
import {RealIP, RealIp} from "nestjs-real-ip";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService : ConfigService,
    private readonly mailService : MailService,
    private readonly redisService : RedisService

  ) {}

  @Post('mail')
  async sendAuth(
    @Body()  {email} : MailAuthDto,
    @RealIP() ip : string,
    @Res() res: Response
  ) {
    const mailerOptions = this.configService.get('mailer');
    const appHost = this.configService.get<string>('app.host');
    const appProtocol = this.configService.get<string>('app.protocol');
    const appPort = this.configService.get<string>('app.port');

    const loginUrl:string = `${appProtocol}://${appHost}:${appPort}/v1/auth/login`;
    console.log('loginUrl',loginUrl);
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
    const redisSet = await this.redisService.set(email, ip)
    console.log('redisResult',redisSet);
    res.status(HttpStatus.OK).json({
      result : {
        accepted : accepted,
        cache : redisSet
      }
    })
  }

  @Post('login')
  async login(
    @Body() {email},
    @RealIP() ip : string,
    @Res() res: Response
  ){
    console.log("auth",email,ip)
    const authIp : string | null = await this.redisService.get(email);

    if(authIp === null){
      return res.status(HttpStatus.NO_CONTENT).json({});
    }
    if(authIp === ip){
      const redisSet = await this.redisService.set(email,"OK");
      return res.status(HttpStatus.OK).json({
        cache : redisSet
      })
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({})


  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
