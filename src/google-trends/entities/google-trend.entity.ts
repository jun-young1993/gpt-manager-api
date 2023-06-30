import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateGoogleTrendDto } from '../dto/create-google-trend.dto';
import { v4 as uuid } from 'uuid';

@Entity('google_trend')
export class GoogleTrend {
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
    type: 'text',
    name: 'article_content',
  })
  articleContent: string;

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
    googleTrend.id = uuid();
    return Object.assign(googleTrend, createDto);
  }
}
