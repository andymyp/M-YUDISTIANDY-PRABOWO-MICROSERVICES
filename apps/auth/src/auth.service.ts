import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';
import { JwtPayload } from './jwt/jwt-payload.model';
import { LoginUserDTO } from './users/dto/login-user.dto';
import { UsersService } from './users/users.service';
import * as bcryptjs from 'bcryptjs';
import { LoginResponseDto } from './users/dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signToken(user: User) {
    const payload: JwtPayload = {
      _id: user._id.toString(),
      emailAddress: user.emailAddress,
    };

    return this.jwtService.signAsync(payload);
  }

  async login(loginUserDto: LoginUserDTO) {
    const { emailAddress, password } = loginUserDto;

    const user = await this.usersService.getUserByEmail(emailAddress);
    if (!user) {
      throw new UnauthorizedException('Invalid emailAddress or password');
    }

    const passwordIsValid = await bcryptjs.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid emailAddress or password');
    }

    const token = await this.signToken(user);
    return new LoginResponseDto(user, token);
  }
}
