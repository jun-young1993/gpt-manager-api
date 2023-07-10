import { Code } from 'src/code/entities/code.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CreateCodeItemDto } from '../dto/create-code-item.dto';

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

  @ManyToOne(() => Code, (code) => code.codeItems)
  @JoinColumn({ name: 'code_id' })
  code: Code;

  static codeItemFromCreateDto(createCodeItemDto: CreateCodeItemDto): CodeItem {
    const codeItem = new CodeItem();
    return Object.assign(codeItem, createCodeItemDto);
  }
}
