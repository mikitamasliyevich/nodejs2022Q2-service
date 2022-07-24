import { Module } from '@nestjs/common';
import { InMemoryStore } from 'src/db/in-memory.db';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, InMemoryStore],
  exports: [UsersService],
})
export class UsersModule {}
