import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    findAll() {

    }

    @Post()
    create(@Body() body: object) {
        
    }

    @Post('process/:id')
    process(@Param('id') id: string) {

    }
}
