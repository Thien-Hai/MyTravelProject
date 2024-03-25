// SRC
import { User } from '../../../../../src/users/entities/user.entity';

export interface IResponeLogin {
  tokenType: string;
  accessToken: string;
  user: User;
}
