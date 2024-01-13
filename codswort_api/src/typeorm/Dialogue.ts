import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Companion } from 'src/typeorm/Companion';

@Entity()
export class Dialogue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  importance: string;

  @Column({ type: 'text', charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  user_input: string;

  @Column({ type: 'text', charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  companion_answer: string;

  @Column({ type: 'datetime' })
  ingame_time: Date;

  @Column()
  companionId: number;

  @ManyToOne(() => Companion, (companion) => companion.dialogues)
  companion: Companion;
}

