import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { guestUser } from 'src/config/config';
import { faker } from '@faker-js/faker';

@Entity('user')
export class User {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public avatar?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  static createGuestUser(): User {
    const user = new User();
    return Object.assign(user, guestUser);
  }

  static createFromDto(createDto: CreateUserDto): User {
    const user = new User();
    user.id = uuid();
    user.avatar = faker.image.avatarGitHub();
    user.email = createDto.email;
    user.name = createDto.name ?? createDto.email;
    return user;
  }

  static toUserPayload(userEntity: User): User {
    const user = new User();
    return Object.assign(user, userEntity);
  }
}
