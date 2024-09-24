import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDTO) {
    return this.usersRepository.create(createUserDto);
  }
}
