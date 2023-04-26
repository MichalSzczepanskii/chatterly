import { Module } from '@nestjs/common';
import { ApiConversationFeatureController } from './api-conversation-feature.controller';
import { ApiConversationDataAccessModule } from '@chatterly/api/conversation/data-access';

@Module({
  imports: [ApiConversationDataAccessModule],
  controllers: [ApiConversationFeatureController],
  providers: [],
  exports: [],
})
export class ApiConversationFeatureModule {}
