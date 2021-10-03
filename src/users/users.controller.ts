import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/transactions/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('profile')
    profile(@CurrentUser() user: User) {
        return this.usersService.findOne(user)
    }
}
