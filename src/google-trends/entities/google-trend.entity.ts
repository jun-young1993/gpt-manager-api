import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateGoogleTrendDto } from '../dto/create-google-trend.dto';
import { v4 as uuid } from 'uuid';
import { IsEnum } from 'class-validator';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';
import { GooGleTrendGeos } from '../google-trends.interface';

@Entity('google_trend')
export class GoogleTrend {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    type: 'varchar',
    length: 36,
  })
  mapping_id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({
    type: 'text',
    name: 'article_content',
  })
  articleContent: string;

  @Column({
    name: 'is_deleted',
    type: 'varchar',
    length: 1,
    default: IS_DELETED.N,
  })
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

  static createFromDto(createDto: CreateGoogleTrendDto): GoogleTrend {
    const googleTrend = new GoogleTrend();
    googleTrend.mapping_id = uuid();
    return Object.assign(googleTrend, createDto);
  }
}
