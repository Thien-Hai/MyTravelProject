import { User } from '../../../../../src/users/entities/user.entity';

export interface IUser {
  email: string;
  username: string;
}

export interface IResponseLogin {
  tokenType: 'Bearer';
  accessToken: string;
  user: User;
}
