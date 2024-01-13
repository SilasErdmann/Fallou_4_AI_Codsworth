import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from 'src/typeorm/Action';

@Module({
  imports: [TypeOrmModule.forFeature([Action])],
  controllers: [],
  providers: []
})
export class ActionModule {}
