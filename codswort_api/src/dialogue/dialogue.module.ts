import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogueService } from './dialogue.service';
import { DialogueController } from './dialogue.controller';
import { Dialogue } from '../typeorm/Dialogue';

@Module({
  imports: [TypeOrmModule.forFeature([Dialogue])],
  providers: [DialogueService],
  controllers: [DialogueController]
})
export class DialogueModule {}