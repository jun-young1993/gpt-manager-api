import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository : Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto.toUserEntity());
  }

  async findOne(id : string): Promise<User | null> {
    
    const fineOneOptions : FindOneOptions<User> =  {
      where : {id : id}
    }
    return await this.usersRepository.findOne(fineOneOptions);
  }

  async findOneOrFail(options : FindOneOptions<User> | string) : Promise<User | NotFoundException> {
    let finduser = null;
    console.log(options)
    if(typeof options === 'string'){
      console.log(options)
      finduser = await this.findOne(options);
    }else{
      finduser = await this.usersRepository.findOne(options as FindOneOptions<User>)
    }
    
    if(finduser === null) throw new NotFoundException(`user with property Not Found`);
    return finduser;
  }
}
