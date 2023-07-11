import { Injectable } from '@nestjs/common';
import { CreateCodeItemDto } from './dto/create-code-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CodeItem } from './entities/code-item.entity';
import { RedisService } from 'src/redis/redis.service';
import { Code } from 'src/code/entities/code.entity';
import { CodeService } from 'src/code/code.service';

const cacheKeys = {
  findOneByKey: (code: string) => {
    return `codeItem.findOneByCode.${code}`;
  },
  findOneByKeyAndCode: (code: string, key: string) => {
    return `codeItem.findOneByCodeAndKey.${code}.${key}`;
  },
};

@Injectable()
export class CodeItemService {
  constructor(
    @InjectRepository(CodeItem)
    private readonly codeItemRepository: Repository<CodeItem>,
    private readonly codeService: CodeService,
    private readonly redisService: RedisService,
  ) {}

  async create(createCodeItemDto: CreateCodeItemDto) {
    const code: Code = await this.codeService.findOne({
      where: {
        id: createCodeItemDto.code,
      },
    });

    const findOneByKCacheKey = cacheKeys.findOneByKey(code.code);
    await this.redisService.delete(findOneByKCacheKey);
    const order: number = await this.codeItemRepository.count({
      where: {
        code: code,
      },
    });
    return await this.codeItemRepository.save({
      ...createCodeItemDto.toCodeItemEntity(),
      ...{ order: order + 1 ?? 0 },
    });
  }

  async find(options: FindManyOptions) {
    return await this.codeItemRepository.find(options);
  }

  async findOne(options: FindOneOptions) {
    return await this.codeItemRepository.findOne(options);
  }

  async findOneByCodeAndKey(code: string, key: string) {
    const cacheKey = cacheKeys.findOneByKeyAndCode(code, key);
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

  async findOneByCode(code: string) {
    const cacheKey = cacheKeys.findOneByKey(code);
    return await this.redisService.caching(cacheKey, async () => {
      return Promise.resolve(
        await this.codeItemRepository
          .createQueryBuilder('codeItem')
          .innerJoin('codeItem.code', 'code')
          .where('code.code = :code', { code })
          .orderBy('order')
          .getMany(),
      );
    });
  }
}
