import { Controller, Request, Post, UseGuards, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CurrentUser } from 'src/transactions/decorators/current-user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SigninUserDto } from './dto/singin-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: SigninUserDto })
  login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }
}
