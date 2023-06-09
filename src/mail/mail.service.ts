import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
@Injectable()
export class MailService {
	async sendLoginCode(
		mailerOptions :string | SMTPTransport | SMTPTransport.Options,
		email : string,
		options : {subject : string , html : string}
	){
		const transporter = nodeMailer.createTransport(mailerOptions)
		const mailOptions = {
			from : process.env.NODEMAILER_USER,
			to: email,
			...options	
		}
			  
		const result = await transporter.sendMail(mailOptions)
		return result;
	}


}
