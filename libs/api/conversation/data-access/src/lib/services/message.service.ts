import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@chatterly/api/users/data-access';
import { Conversation } from '../entities/conversation.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>
  ) {}

  async addMessageToConversation(body: {
    conversationId: number;
    authorId: number;
    content: string;
  }) {
    console.log(body);
    const message = new Message();
    message.conversation = { ...new Conversation(), id: body.conversationId };
    message.author = { ...new User(), id: body.authorId };
    message.text = body.content;
    return this.messageRepository.save(message);
  }
}
