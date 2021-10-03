import { Exclude } from 'class-transformer';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 500 })
  points: number;

  @OneToMany(() => Transaction, (transaction) => transaction.from_user)
  transactions_made: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.to_user)
  transactions_received: Transaction[];
}
