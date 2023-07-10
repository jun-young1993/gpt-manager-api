import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Code])],
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService, CodeModule, TypeOrmModule.forFeature([Code])],
})
export class CodeModule {}
