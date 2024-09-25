import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/account/:accountNumber')
  @UseGuards(AuthGuard('jwt'))
  getUserByAccountNumber(@Param('accountNumber') accountNumber: string) {
    return this.userService.getUserByAccountNumber(accountNumber);
  }

  @Get('/identity/:identityNumber')
  @UseGuards(AuthGuard('jwt'))
  getUserByIdentityNumber(@Param('identityNumber') identityNumber: string) {
    return this.userService.getUserByIdentityNumber(identityNumber);
  }
}
