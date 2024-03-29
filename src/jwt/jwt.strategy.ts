import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { _GUEST } from 'src/config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService, // private readonly jwtService: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return this.extractTokenFromRequest(request);
        },
      ]),
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    return request?.cookies?.Authentication;
  }

  private extractGuestFromRequest(request: Request): string | string[] {
    return request?.headers?.guest;
  }

  private checkGuest(headerValue: string | string[]) {
    if (headerValue === _GUEST) {
      return true;
    }

    return false;
  }

  async authenticate(request: Request): Promise<any> {
    const isGuest = this.extractGuestFromRequest(request);

    if (this.checkGuest(String(isGuest))) {
      // 토큰이 없는 경우 비회원 객체를 생성하여 반환
      const guestUser = User.createGuestUser();
      return this.success(guestUser);
    }

    return super.authenticate(request); // 기존 인증 로직 실행
  }

  private isGuest(email) {
    if (email === _GUEST) {
      return true;
    }
    return false;
  }

  async validate(payload: TokenPayload): Promise<User | NotFoundException> {
    const { email } = payload;

    if (this.isGuest(email)) {
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
