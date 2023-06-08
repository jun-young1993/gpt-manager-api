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
    // let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: ConfigService.get<string>('mailer.auth.user'), // generated ethereal user
    //     pass: ConfigService.get<string>('mailer.auth.pass')
    //   },
    // });


    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: "bar@example.com, baz@example.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });
    //
    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    // return info;
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
