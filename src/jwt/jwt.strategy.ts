import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('jwt.secret')
    });
  }
  // async validate(payload: TokenPayload) {
	// console.log('validate ',payload);
  //   return true;
  // }
  async validate(payload: any) : Promise<any>{
    const {email} = payload;
    const user = await this.userService.findOneOrFail({
      where : {
        email : email
      }
    })
    return user;
  }
  
}