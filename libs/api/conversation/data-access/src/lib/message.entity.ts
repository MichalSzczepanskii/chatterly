import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@chatterly/api/users/data-access';
import { Conversation } from './conversation.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(type => Conversation)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @Column()
  text: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  readAt: Date;
}
