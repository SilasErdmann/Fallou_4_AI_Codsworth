import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Companion } from 'src/typeorm/Companion';

@Entity()
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  user_input: string;

  @Column({ type: 'text' })
  companion_answer: string;

  @Column()
  companionId: number;

  @ManyToOne(() => Companion, (companion) => companion.examples)
  companion: Companion;
}
