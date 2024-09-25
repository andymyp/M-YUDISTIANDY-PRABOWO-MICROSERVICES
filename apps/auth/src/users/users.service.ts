import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDTO) {
    await this.validateEmail(createUserDto);
    await this.validateAccountNumber(createUserDto);
    await this.validateIdentityNumber(createUserDto);
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcryptjs.hash(createUserDto.password, 10),
    });
  }

  async validateAccountNumber(createUserDto: CreateUserDTO) {
    try {
      await this.usersRepository.findOne({
        accountNumber: createUserDto.accountNumber,
      });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('accountNumber already exists');
  }

  async validateEmail(createUserDto: CreateUserDTO) {
    try {
      await this.usersRepository.findOne({
        emailAddress: createUserDto.emailAddress,
      });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('emailAddress already exists');
  }

  async validateIdentityNumber(createUserDto: CreateUserDTO) {
    try {
      await this.usersRepository.findOne({
        identityNumber: createUserDto.identityNumber,
      });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('emailAddress already exists');
  }

  async getUserByEmail(emailAddress: string) {
    return this.usersRepository.findOne({ emailAddress });
  }
}
