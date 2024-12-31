import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hanzi')
export class HanziEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 1 })
  hanzi_name!: string;

  @Column('decimal', { precision: 5, scale: 2 })
  frequency!: number;
} 