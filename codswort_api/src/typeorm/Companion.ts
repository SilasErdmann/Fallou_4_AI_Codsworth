import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Action } from 'src/typeorm/Action';
import { Dialogue } from 'src/typeorm/Dialogue';
import { Example } from 'src/typeorm/Example';
import { Memory } from 'src/typeorm/Memory';
import { Trait } from 'src/typeorm/Trait';

@Entity()
export class Companion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({ type: 'varchar', length: 10 })
  gender: string;

  @Column({ type: 'varchar', length: 255 })
  race: string;

  @Column({ type: 'int' })
  relation_startvalue: number;

  @OneToMany(() => Action, (action) => action.companion)
  actions: Action[];

  @OneToMany(() => Dialogue, (dialogue) => dialogue.companion)
  dialogues: Dialogue[];

  @OneToMany(() => Example, (example) => example.companion)
  examples: Example[];

  @OneToMany(() => Memory, (memory) => memory.companion)
  memories: Memory[];

  @OneToMany(() => Trait, (trait) => trait.companion)
  traits: Trait[];
}
