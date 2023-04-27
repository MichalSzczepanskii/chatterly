import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Repository } from 'typeorm';
import { User } from '@chatterly/api/users/data-access';
import { Message } from '../entities/message.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>
  ) {}

  getConversationByParticipantsQueryBuilder(participantIds: number[]) {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .innerJoin('conversation.users', 'conversationUsers')
      .groupBy('conversation.id')
      .having('SUM((conversationUsers.id NOT IN (:...usersIds))::int) = 0', {
        usersIds: participantIds,
      });
  }

  async getConversationByParticipants(participantIds: number[]) {
    return this.getConversationByParticipantsQueryBuilder(
      participantIds
    ).getOne();
  }

  async getConversationByParticipantsWithRelations(participantIds: number[]) {
    return this.getConversationByParticipantsQueryBuilder(participantIds)
      .innerJoinAndSelect('conversation.messages', 'messages')
      .innerJoinAndSelect('messages.author', 'messageAuthor')
      .innerJoinAndSelect('conversation.users', 'users')
      .groupBy('conversation.id, messages.id, messageAuthor.id, users.id')
      .getOne();
  }

  async createNewConversation(participantIds: number[]) {
    const conservation = new Conversation();
    conservation.users = participantIds.map(id => ({ ...new User(), id }));
    return await this.conversationRepository.save(conservation);
  }

  async getOrCreateConservation(participantsIds: number[]) {
    return (
      (await this.getConversationByParticipants(participantsIds)) ??
      (await this.createNewConversation(participantsIds))
    );
  }

  getUserConversation(userId: number) {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .innerJoinAndSelect('conversation.messages', 'message')
      .innerJoinAndSelect('message.author', 'author')
      .innerJoinAndSelect('conversation.users', 'users')
      .where(qb => {
        qb.where(
          `message.id in` +
            qb
              .subQuery()
              .select('MAX(message.id)')
              .from(Message, 'message')
              .groupBy('conversation_id, author.id')
              .getSql()
        );
      })
      .innerJoin(
        'conversation.users',
        'usersFilter',
        'usersFilter.id = :userId',
        { userId }
      )
      .getMany();
  }
}
