import { Injectable } from '@nestjs/common';
import { CreateCodeItemDto } from './dto/create-code-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CodeItem } from './entities/code-item.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CodeItemService {
  constructor(
    @InjectRepository(CodeItem)
    private readonly codeItemRepository: Repository<CodeItem>,
    private readonly redisService: RedisService,
  ) {}

  async create(createCodeItemDto: CreateCodeItemDto) {
    return await this.codeItemRepository.save(
      createCodeItemDto.toCodeItemEntity(),
    );
  }

  async find(options: FindManyOptions) {
    return await this.codeItemRepository.find(options);
  }

  async findOne(options: FindOneOptions) {
    return await this.codeItemRepository.findOne(options);
  }

  async findOneByCodeAndKey(code: string, key: string) {
    const cacheKey = `codeItem.findOneByCodeAndKey.${code}.${key}`;

    // async function callback(): {
    //   return Promise.resolve(
    //     _this.codeItemRepository
    //     .createQueryBuilder('codeItem')
    //     .innerJoin('codeItem.code', 'code')
    //     .where('code.code = :code', { code })
    //     .andWhere('codeItem.key = :key', { key })
    //       .getOne()
    //   )

    // }
    return await this.redisService.caching(cacheKey, async () => {
      return Promise.resolve(
        await this.codeItemRepository
          .createQueryBuilder('codeItem')
          .innerJoin('codeItem.code', 'code')
          .where('code.code = :code', { code })
          .andWhere('codeItem.key = :key', { key })
          .getOne(),
      );
    });
  }
}
