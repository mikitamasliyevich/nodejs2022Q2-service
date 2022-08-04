import {
    Body,
    Controller,
    HttpCode,
    Post,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { InMemoryStore } from 'src/db/in-memory.db';
  import { CreateUserDto } from '../users/dto/createUser.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private inMemory: InMemoryStore
    ) { }
  
    @Post('signup')
    @HttpCode(201)
    public async create(@Body() createUserDto: CreateUserDto) {
      return this.authService.signUp(createUserDto);
    }
  
  
    @Post('login')
    @HttpCode(200)
    public async login(@Body() createUserDto: CreateUserDto) {
      const users = this.inMemory.authUsers
      const finded = users.find(user => user.login === createUserDto.login)
        if (finded) {
          return this.authService.login(finded);
        }
      }
    }