import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { _GUEST } from 'src/config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService, // private readonly jwtService: JwtService
  ) {
    // if (request?.cookies?.Authentication === undefined) {
    // const payload: TokenPayload = User.createGuestUser();
    // console.log('guest payload',payload);
    // const guestToken = await this.jwtService.signAsync(payload);
    //   return guestToken;
    // }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log('request?.cookies', request?.cookies);
          // if (request?.cookies?.Authentication === undefined) {
          //   const payload: TokenPayload = User.createGuestUser();
          //   console.log('guest payload',payload);
          //   const guestToken = await this.jwtService.signAsync(payload);
          //   return guestToken;
          // }
          return this.extractTokenFromRequest(request);
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    console.log('request?.cookies?.Authentication',request?.cookies?.Authentication)
    console.log('typeof',typeof request?.cookies?.Authentication)
    return request?.cookies?.Authentication;
  }

  private isUndefinedAuthentication(token:string | undefined){
    if(token === 'undefined' || token === undefined){
      return false;
    }

    return true;
  }

  async authenticate(request: Request): Promise<any> {
    const token = this.extractTokenFromRequest(request); // 토큰 추출
    
    if (!this.isUndefinedAuthentication(token)) {
      // 토큰이 없는 경우 비회원 객체를 생성하여 반환
      const guestUser = User.createGuestUser();
      console.log('guestUser', guestUser);
      return this.success(guestUser);
    }

    return super.authenticate(request); // 기존 인증 로직 실행
  }

  private isGuest(email){
    if (email === _GUEST) {
      return true;
    }
    return false;
  }

  async validate(payload: TokenPayload): Promise<User | NotFoundException> {
    const { email } = payload;
    console.log("payload",payload)
    if (this.isGuest(email)) {
      console.log(payload);
      return User.createGuestUser();
    }
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
