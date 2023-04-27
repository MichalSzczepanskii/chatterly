import { createReducer, on } from '@ngrx/store';
import * as ConversationActions from './conversation.actions';
import { Conversation } from '@chatterly/shared/data-access';

export const conversationFeatureKey = 'conversation';

export interface ConversationState {
  conversation: Conversation | null;
  loading: boolean;
}

export const initialConversationState: ConversationState = {
  conversation: null,
  loading: false,
};

export const conversationReducer = createReducer(
  initialConversationState,

  on(ConversationActions.loadPrivateConversation, state => ({
    ...state,
    loading: true,
  })),
  on(
    ConversationActions.privateConversationSuccess,
    (state, { conversation }) => ({ ...state, conversation, loading: false })
  )
);
