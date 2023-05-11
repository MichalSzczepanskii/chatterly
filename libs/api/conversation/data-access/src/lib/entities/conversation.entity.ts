import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@chatterly/api/users/data-access';
import { Message } from './message.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[];
}
