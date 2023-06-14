import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as nodeMailer from 'nodemailer';
import configuration from 'src/config/configuration';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import {ConfigService} from "@nestjs/config";
@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService : JwtService,
		private readonly configService : ConfigService
	){}
	public async getCookieWithJwtToken(email: string) {
		const payload: TokenPayload = { email };
		const token = await this.jwtService.signAsync(payload);
		console.log(`Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>('jwt.expiration_time')}`)
		
		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>('jwt.expiration_time')}`;

	}
  
}

