import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { User } from './entities/user.entity';
import { InMemoryStore } from 'src/db/in-memory.db';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private inMemoryStore: InMemoryStore) {}

  findAll(): User[] {
    return this.inMemoryStore.users;
 }

 create({ login, password }: CreateUserDto) {
  const time = new Date().getTime()
    const newUser = new User();
    newUser.id = v4();
    newUser.login = login;
    newUser.password = password;
    newUser.version = 0
    newUser.createdAt = time
    newUser.updatedAt = 0
    this.inMemoryStore.users.push(newUser);
    return newUser;
}

 async findOne(id: string): Promise<User> {
  const user = this.inMemoryStore.users.find((item) => item.id === id);
  if (!user) {
    // throw new NotFoundException();
  } else {
    return user;
  }
}
}

