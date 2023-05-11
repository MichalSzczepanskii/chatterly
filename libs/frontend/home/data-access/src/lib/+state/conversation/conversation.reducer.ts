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
    (state, { conversation }) => {
      const messages = conversation?.messages
        .slice()
        .sort(
          (a, b) =>
            new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
        );
      return {
        ...state,
        conversation: { ...conversation, messages: messages ?? [] },
        loading: false,
      };
    }
  ),
  on(ConversationActions.sendPrivateMessage, (state, { message }) => {
    const messages = [...(state.conversation?.messages ?? []), message];
    const conversation = Object.assign({}, state.conversation);
    conversation.messages = messages;
    return { ...state, conversation };
  })
);
