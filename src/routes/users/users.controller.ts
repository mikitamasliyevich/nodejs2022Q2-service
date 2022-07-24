import { Controller, Get, Post, Body, HttpCode, Param, ParseUUIDPipe, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
   return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.usersService.remove(id);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Body() updatePasswordDto : UpdatePasswordDto ,
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
     return this.usersService.update(id, updatePasswordDto)
  }
}
