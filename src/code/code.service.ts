import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
  ) {}

  async create(createCodeDto: CreateCodeDto) {
    return await this.codeRepository.save(createCodeDto.toCodeEntity());
  }

  async find(options: FindManyOptions) {
    return await this.codeRepository.find(options);
  }

  async findOne(options: FindOneOptions) {
    return await this.codeRepository.findOne(options);
  }
}
