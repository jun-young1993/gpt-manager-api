import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log('request?.cookies', request?.cookies);
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('jwt.secret'),
    });
  }
  // async validate(payload: TokenPayload) {
  // console.log('validate ',payload);
  //   return true;
  // }
  async validate(payload: any): Promise<User | NotFoundException> {
    const { email } = payload;
    const user = await this.userService.findOneOrFail({
      where: {
        email: email,
      },
    });
    if (user) {
      return User.toUserPayload(user as User);
    }
    throw new NotFoundException();
  }
}
