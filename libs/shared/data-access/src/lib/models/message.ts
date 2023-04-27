import { User } from './user';

export interface Message {
  id: number;
  text: string;
  author: User;
  createdAt: Date;
  readAt?: Date;
}
