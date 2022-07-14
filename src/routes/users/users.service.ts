import { Injectable, NotFoundException,ForbiddenException } from '@nestjs/common';
import { v4 } from 'uuid';
import { User } from './entities/user.entity';
import { InMemoryStore } from 'src/db/in-memory.db';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class UsersService {
  constructor(private inMemoryStore: InMemoryStore) {}

  findAll(): User[] {
    return this.inMemoryStore.users;
 }

 create({ login, password }: CreateUserDto) {
    const newUser = new User();
    newUser.id = v4();
    newUser.login = login;
    newUser.password = password;
    newUser.version = 1
    newUser.createdAt = + new Date()
    newUser.updatedAt = + new Date()
    this.inMemoryStore.users.push(newUser);
    return newUser;
}

 async findOne(id: string) {
  const user = this.inMemoryStore.users.find((item) => item.id === id);
  if (!user) {
    throw new NotFoundException('User is not found with this ID');
  } else {
    return user;
  }
}

remove(id: string): any {
  const user: User = this.inMemoryStore.users.find((item: User) => item.id === id);
  if (user) {
    this.inMemoryStore.users = this.inMemoryStore.users.filter((item) => item.id !== id);
  } else {
    throw new NotFoundException(`There is no user with id: ${id}`);
  } 
}


update(id: string, updatePasswordDto: UpdatePasswordDto) {
  
  const user: User = this.inMemoryStore.users.find((item: User) => item.id === id);

  if (user) {
    const userIndex = this.inMemoryStore.users.findIndex((user => user.password == updatePasswordDto.oldPassword));
    if(userIndex !== -1){
      this.inMemoryStore.users[userIndex].password = updatePasswordDto.newPassword
      this.inMemoryStore.users[userIndex].version = 2
      this.inMemoryStore.users[userIndex].updatedAt = + new Date()
      return this.inMemoryStore.users[userIndex]
    } else {
      throw new ForbiddenException()
    }
  } else {
    throw new NotFoundException(`There is no user with id: ${id}`);
  }  
}
}

