import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { ConversationMember } from './conversation-member.entity';
import { Message } from './message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, ConversationMember, Message]),
  ],
  providers: [],
  exports: [],
})
export class ApiConversationDataAccessModule {}
