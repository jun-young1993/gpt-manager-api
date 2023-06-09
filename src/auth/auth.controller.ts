import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { v4 } from "uuid";
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService : ConfigService,
    private readonly mailService : MailService
  ) {}

  @Post('mail')
  async sendAuth(
    @Body()  {email},
    @Res() res: Response
  ) {
    const mailerOptions = this.configService.get('mailer');
    
    const {accepted} = await this.mailService.sendLoginCode(
        mailerOptions,
        email,
        {
          subject: '가입 인증 메일',
          html: `
          가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
          <form action="#" method="POST">
            <button>가입확인</button>
          </form>  
          <div>
            ${v4()}
          </div>
          `,
        }
    );
    
    res.status(HttpStatus.OK).json({
      result : {
        accepted : accepted
      }
    })
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
