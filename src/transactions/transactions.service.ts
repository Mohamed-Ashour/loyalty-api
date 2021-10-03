import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly usersService: UsersService,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, fromUser: User) {
    createTransactionDto.from_user = await this.usersService.findOne(fromUser);

    if (createTransactionDto.from_user.points < createTransactionDto.points) {
      throw new BadRequestException('insufficient points');
    }

    const toUser = await this.usersService.findOne(
      createTransactionDto.to_user,
    );

    if (!toUser) {
      throw new NotFoundException('user not found');
    }

    createTransactionDto.to_user = toUser;
    const transaction = this.transactionRepository.create(createTransactionDto);
    return this.transactionRepository.save(transaction);
  }

  findAll() {
    return this.transactionRepository.find({
      relations: ['from_user', 'to_user'],
    });
  }

  findOne(transactionId: number) {
    return this.transactionRepository.findOne(transactionId, {
      relations: ['from_user', 'to_user'],
    });
  }

  async process(transactionId: number) {
    const transaction = await this.findOne(transactionId);
    if (!transaction) {
      throw new NotFoundException('transaction not found');
    }

    // check if transaction is expired
    const transactionLetancy = (new Date().getTime() - new Date(transaction.createdDate).getTime()) / 1000;
    if(transactionLetancy > this.configService.get<number>('TRANSACTION_EXPIRATION_SECONDS')) {
      throw new BadRequestException('transaction expired');
    }

    // check if user have enough points
    if (transaction.from_user.points < transaction.points) {
      throw new BadRequestException('insufficient points');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      transaction.from_user.points -= transaction.points;
      transaction.to_user.points += transaction.points;
      transaction.approved = true;
      await queryRunner.manager.save(transaction);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
