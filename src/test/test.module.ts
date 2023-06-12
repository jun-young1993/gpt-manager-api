import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  controllers: [TestController],
  providers: [TestService,JwtStrategy]
})
export class TestModule {}
