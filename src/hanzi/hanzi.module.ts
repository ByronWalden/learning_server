import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HanziEntity, UserEntity, UserHanziEntity } from '../entity';
import { HanziController, HanziService } from './';

@Module({
  imports: [TypeOrmModule.forFeature([HanziEntity, UserHanziEntity, UserEntity])],
  controllers: [HanziController],
  providers: [HanziService],
})
export class HanziModule {}
