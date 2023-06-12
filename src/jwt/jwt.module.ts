import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {JwtModule as NestJwtModule, JwtModuleAsyncOptions} from "@nestjs/jwt"
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/local.strategy';
import { ConfigModule } from 'src/config/config.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';
// configService.get<string>('jwt.secret')
@Module({
	imports : [
		// UserModule,
		ConfigModule,
		NestJwtModule.registerAsync({
			imports : [ConfigModule],
			inject : [ConfigService],
			useFactory : async (configService : ConfigService) => ({
				secret : `${configService.get<string>('jwt.secret')}s`,
				signOptions : {
					expiresIn : `${configService.get<string>('jwt.expiration_time')}s`,
				},	
			})
		
		})
	],
	exports : [NestJwtModule],
	providers : [JwtStrategy]
})
export class JwtModule {}
