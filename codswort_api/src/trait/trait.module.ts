import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraitController } from './trait.controller';
import { TraitService } from './trait.service';
import { Trait } from 'src/typeorm/Trait';

@Module({
  imports: [TypeOrmModule.forFeature([Trait])],
  controllers: [TraitController],
  providers: [TraitService]
})
export class TraitModule {}
