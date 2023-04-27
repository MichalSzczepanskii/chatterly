import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUserSearch from './+state/user-search/user-search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserSearchEffects } from './+state/user-search/user-search.effects';
import * as fromConversation from './+state/conversation/conversation.reducer';
import { ConversationEffects } from './+state/conversation/conversation.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromUserSearch.userSearchFeatureKey,
      fromUserSearch.reducer
    ),
    EffectsModule.forFeature([UserSearchEffects, ConversationEffects]),
    StoreModule.forFeature(
      fromConversation.conversationFeatureKey,
      fromConversation.conversationReducer
    ),
  ],
})
export class FrontendHomeDataAccessModule {}
