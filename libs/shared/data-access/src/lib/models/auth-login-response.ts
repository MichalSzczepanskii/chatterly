import { User } from './user';

export interface AuthLoginResponse {
  access_token: string;
  user: User;
}
