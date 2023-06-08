import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
@Injectable()
export class MailService {
	async sendLoginCode(
		mailerOptions :string | SMTPTransport | SMTPTransport.Options,
		email : string
	){
		const transporter = nodeMailer.createTransport(mailerOptions)
		const mailOptions = {
			from : process.env.NODEMAILER_USER,
			to: email,
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
	}


}
