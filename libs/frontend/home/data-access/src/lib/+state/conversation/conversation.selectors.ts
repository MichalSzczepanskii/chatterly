import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConversation from './conversation.reducer';

export const selectConversationState =
  createFeatureSelector<fromConversation.ConversationState>(
    fromConversation.conversationFeatureKey
  );

export const selectConversationLoading = createSelector(
  selectConversationState,
  state => state.loading
);

export const selectConversation = createSelector(
  selectConversationState,
  state => state.conversation
);
