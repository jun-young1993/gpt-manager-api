import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [UserModule],
  controllers: [TestController],
  providers: [TestService,JwtStrategy]
})
export class TestModule {}
