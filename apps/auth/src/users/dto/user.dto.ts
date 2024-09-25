import { User } from '../entities/user.entity';

export class UserDto {
  _id: string;
  readonly userName: string;
  readonly accountNumber: string;
  readonly emailAddress: string;
  readonly identityNumber: string;

  constructor(user: User) {
    this._id = user._id.toString();
    this.userName = user.userName;
    this.accountNumber = user.accountNumber;
    this.emailAddress = user.emailAddress;
    this.identityNumber = user.identityNumber;
  }
}
