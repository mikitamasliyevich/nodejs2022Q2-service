import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../interfaces/createUser.dto';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
