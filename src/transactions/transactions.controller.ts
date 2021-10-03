import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.transactionsService.findAll();
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() body: CreateTransactionDto, @CurrentUser() user: User) {
    return this.transactionsService.create(body, user);
  }

  @Patch('process/:id')
  process(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.process(id);
  }
}
