import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as nodeMailer from 'nodemailer';
import configuration from 'src/config/configuration';
// import {ConfigService} from "@nestjs/config";
@Injectable()
export class AuthService {
  async create(createAuthDto: CreateAuthDto,mailerOptions) {
    console.log(mailerOptions);
    const transporter = nodeMailer.createTransport(mailerOptions)
  
    const mailOptions = {
      from : 'juny3738@gmail.com',
      to: 'juny3738@gmail.com',
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="#" method="POST">
          <button>가입확인</button>
        </form>  
        `,
    }
    const result = await transporter.sendMail(mailOptions)
    console.log('result',result);
    return
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
