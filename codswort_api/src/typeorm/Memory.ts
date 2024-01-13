import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Companion } from 'src/typeorm/Companion';

@Entity()
export class Memory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'datetime', nullable: true })
  ingame_time: Date;

  @Column()
  companionId: number;

  @ManyToOne(() => Companion, (companion) => companion.memories)
  companion: Companion;
}
