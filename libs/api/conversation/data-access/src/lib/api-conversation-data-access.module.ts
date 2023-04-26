import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message])],
  providers: [ConversationService, MessageService],
  exports: [ConversationService, MessageService],
})
export class ApiConversationDataAccessModule {}
