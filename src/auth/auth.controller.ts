import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import {MailAuthDto} from "./dto/mail-auth.dto";
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

    // const {email} = mailAuthDto;

    console.log('mail',email);
    const mailerOptions = this.configService.get('mailer');
    console.log('mailerOptions',mailerOptions);
    await this.mailService.sendLoginCode(
      mailerOptions,
        // email ?? 'hi'
        email
    );
    res.status(HttpStatus.OK).json({
      data : []
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
