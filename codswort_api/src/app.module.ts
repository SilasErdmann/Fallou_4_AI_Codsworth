import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Action } from 'src/typeorm/Action';
import { Companion } from './typeorm/Companion';
import { Dialogue } from 'src/typeorm/Dialogue';
import { Memory } from 'src/typeorm/Memory';
import { Trait } from 'src/typeorm/Trait';
import { Example } from 'src/typeorm/Example';

import { ActionModule } from './action/action.module';
import { CompanionModule } from './companion/companion.module';
import { DialogueModule } from './dialogue/dialogue.module';
import { MemoryModule } from './memory/memory.module';
import { TraitModule } from './trait/trait.module';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3400,
      username: 'root',
      password: 'Fallout4',
      database: 'Fallout4_Companions',
      entities: [
        Companion,
        Action,
        Dialogue,
        Memory,
        Trait,
        Example,
      ],
      synchronize: true,
    }),
    CompanionModule,
    ActionModule,
    DialogueModule,
    MemoryModule,
    TraitModule,
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}