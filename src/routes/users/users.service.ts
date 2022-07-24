import { Injectable, NotFoundException,ForbiddenException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NOT_EXIST } from 'src/utils';


@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>
    ) {}

  async findAll() {
    return await this.userRepository.find();
 }

 async create(user: CreateUserDto) {
    const createdUser = this.userRepository.create({...user})
    return (await this.userRepository.save(createdUser)).toResponse();
}

 async findOne(userId: string) {
  const user = await this.userRepository.findOne( {where: {id: userId}} )
    if (user) return user;
    throw new NotFoundException(NOT_EXIST);
}

async remove(userId: string) {
  const result = await this.userRepository.delete(userId)
  if (result.affected === 0) {
    throw new NotFoundException(NOT_EXIST);
  }
}

async update(userId: string, updatePasswordDto: UpdatePasswordDto) {
  const user = await this.userRepository.findOne({ where: { id: userId } });

  if (user) {
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Password is not right');
    }
    return (
      await this.userRepository.save(
        this.userRepository.create({
          ...user,
          password: updatePasswordDto.newPassword,
        }),
      )
    ).toResponse();
  }
  throw new NotFoundException();
}
}
