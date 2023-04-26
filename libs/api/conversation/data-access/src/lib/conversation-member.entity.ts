import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@chatterly/api/users/data-access';
import { Conversation } from './conversation.entity';

@Entity()
export class ConversationMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Conversation)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
