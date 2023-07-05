import { IsEnum } from 'class-validator';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';
import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateGoogleTrendsMappingDto } from '../dto/create-google-trends-mapping.dto';

export class GoogleTrendsMapping {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column()
  public type: string;

  @Column()
  public title: string;

  @Column({
    name: 'is_deleted',
    type: 'varchar',
    length: 1,
    default: IS_DELETED.N,
  })

  @Column({
    type: 'varchar',
    length: 5,
  })
  public geo: string;

  @Column({
    type: 'varchar',
    length: 1,
  })
  public date: string;

  @IsEnum(IS_DELETED)
  public isDeleted: IS_DELETED;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  static createFromDto(
    createDto: CreateGoogleTrendsMappingDto,
  ): GoogleTrendsMapping {
    const googleTrendsMapping = new GoogleTrendsMapping();
    googleTrendsMapping.id = uuid();
    return Object.assign(googleTrendsMapping, createDto);
  }
}
