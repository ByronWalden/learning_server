import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { FrequencyLevel } from '../common/constants/frequency-level.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  uid!: number;

  @Column({ type: 'enum', enum: FrequencyLevel, default: FrequencyLevel.LEVEL_1 })
  frequency_level!: FrequencyLevel;

  @CreateDateColumn()
  create_time!: Date;

  @UpdateDateColumn()
  update_time!: Date;
} 