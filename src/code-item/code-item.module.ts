import { Module } from '@nestjs/common';
import { CodeItemService } from './code-item.service';
import { CodeItemController } from './code-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeItem } from './entities/code-item.entity';
import { CodeModule } from 'src/code/code.module';
import { RedisModule } from 'src/redis/redis.module';
import { Code } from 'src/code/entities/code.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodeItem, Code]),
    CodeModule,
    RedisModule,
  ],
  controllers: [CodeItemController],
  providers: [CodeItemService, CodeModule],
  exports: [CodeItemModule,CodeItemService],
})
export class CodeItemModule {}
