import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDTO) {
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcryptjs.hash(createUserDto.password, 10),
    });
  }

  async getUserByEmail(emailAddress: string) {
    return this.usersRepository.findOne({ emailAddress });
  }
}
