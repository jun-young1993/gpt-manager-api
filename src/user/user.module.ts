import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/jwt/jwt.strategy';


@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserModule,UserService]
})
export class UserModule {}
