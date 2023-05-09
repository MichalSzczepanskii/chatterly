import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';
import { ApiUsersDataAccessModule } from '@chatterly/api/users/data-access';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message]),
    ApiUsersDataAccessModule,
  ],
  providers: [ConversationService, MessageService],
  exports: [ConversationService, MessageService],
})
export class ApiConversationDataAccessModule {}
