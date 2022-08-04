import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { InMemoryStore } from 'src/db/in-memory.db';


@Module({
  providers: [AuthService, InMemoryStore],
  controllers: [AuthController],
})
export class AuthModule { }