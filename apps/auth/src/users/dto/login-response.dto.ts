import { User } from '../entities/user.entity';
import { UserDto } from './user.dto';

export class LoginResponseDto extends UserDto {
  token: string;

  constructor(user: User, token?: string) {
    super(user);
    this.token = token;
  }
}
