import { Controller, Get, Post, Body, HttpCode, Param, ParseUUIDPipe, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UsersService } from './users.service';
import { HTTP_ANSWERS, HTTP_CODES } from 'src/utils';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HTTP_CODES.SUCCESS)
   create(@Body() createUserDto: CreateUserDto) {
   return this.usersService.create(createUserDto);
  }

  @Get()
   findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
   findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HTTP_CODES.DELETED)
   remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.usersService.remove(id);
  }

  @Put(':id')
  @HttpCode(HTTP_CODES.UPDATED)
   update(
    @Body() updatePasswordDto : UpdatePasswordDto ,
    @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
     return this.usersService.update(id, updatePasswordDto)
  }
}
