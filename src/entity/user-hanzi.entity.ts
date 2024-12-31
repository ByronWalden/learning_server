import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_hanzi')
export class UserHanziEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  hanzi_id!: number;

  @Column({ length: 1 })
  hanzi_name!: string;

  @Column()
  frequency!: number;

  @Column({ default: 0 })
  sem_dom!: number;

  @Column({ default: 0 })
  pro_dom!: number;

  @Column({ default: 0 })
  learn_count!: number;

  @CreateDateColumn()
  start_time!: Date;

  @UpdateDateColumn()
  update_time!: Date;
} 