import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    register(@Body() body: object) {

    }

    @Post('signin')
    signIn(@Body() body: object) {

    }

    @Get(':id')
    getOne(@Param('id') id: number) {

    }
}