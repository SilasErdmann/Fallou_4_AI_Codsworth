import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanionController } from './companion.controller';
import { CompanionService } from './companion.service';
import { Companion } from 'src/typeorm/Companion';
import { Dialogue } from 'src/typeorm/Dialogue';

@Module({
  imports: [TypeOrmModule.forFeature([Companion, Dialogue])],
  controllers: [CompanionController],
  providers: [CompanionService]
})
export class CompanionModule {}
