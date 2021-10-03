import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  points: number;
  
  @Column({ default: false })
  approved: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User, (user) => user.transactions_made, {cascade: true})
  from_user: User;

  @ManyToOne(() => User, (user) => user.transactions_received, {cascade: true})
  to_user: User;
}
