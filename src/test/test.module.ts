import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TasksService } from 'src/tasks/tasks.service';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports : [UserModule,TasksModule],
  controllers: [TestController],
  providers: [TestService, JwtStrategy, TasksService],
})
export class TestModule {}
