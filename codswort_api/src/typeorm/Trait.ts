import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Companion } from 'src/typeorm/Companion';

@Entity()
export class Trait {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column()
  companionId: number;

  @ManyToOne(() => Companion, (companion) => companion.traits)
  companion: Companion;
}
