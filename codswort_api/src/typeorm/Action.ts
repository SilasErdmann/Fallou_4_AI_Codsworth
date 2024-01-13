import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Companion } from 'src/typeorm/Companion';

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  action: string; // Die Aktion des Spielers (z.B. stehlen, helfen, etc.)

  @Column({ type: 'int' })
  effect: number; // Der Effekt (z.B. +15 für gefallen oder -35 für gehasst)

  @Column({ type: 'datetime' })
  ingame_time: Date;

  @Column()
  companionId: number;

  @ManyToOne(() => Companion, (companion) => companion.actions)
  companion: Companion;
}
