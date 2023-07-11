import { Code } from 'src/code/entities/code.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CreateCodeItemDto } from '../dto/create-code-item.dto';
import { IS_DELETED } from 'src/typeorm/typeorm.interface';
import { IsEnum } from 'class-validator';

@Entity()
export class CodeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column({
    default: null,
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'is_deleted',
    type: 'varchar',
    length: 1,
    default: IS_DELETED.N,
  })
  @IsEnum(IS_DELETED)
  public isDeleted: IS_DELETED;

  @ManyToOne(() => Code, (code) => code.codeItems)
  @JoinColumn({ name: 'code_id' })
  code: Code;

  @Column({
    default: 0,
  })
  order: number;

  static codeItemFromCreateDto(createCodeItemDto: CreateCodeItemDto): CodeItem {
    const codeItem = new CodeItem();
    return Object.assign(codeItem, createCodeItemDto);
  }
}
