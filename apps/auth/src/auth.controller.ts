import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users/users.service';
import { LoginUserDTO } from './users/dto/login-user.dto';
import { CreateUserDTO } from './users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(loginUserDTO);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }
}
