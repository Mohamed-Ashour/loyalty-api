import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(registerUserDto: CreateUserDto) {
    const user = this.userRepository.create(registerUserDto);
    return this.userRepository.save(user);
  }

  findOne(user: User) {
    return this.userRepository.findOne(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }
}
