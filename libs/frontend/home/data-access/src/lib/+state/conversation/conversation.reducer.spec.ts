import {
  conversationReducer,
  initialConversationState,
} from './conversation.reducer';
import * as ConversationActions from './conversation.actions';
import { Conversation } from '@chatterly/shared/data-access';
import { UserFactory } from '@chatterly/frontend/shared/spec-utils';

describe('Conversation Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = conversationReducer(initialConversationState, action);

      expect(result).toBe(initialConversationState);
    });
  });

  describe('LoadPrivateConversation action', () => {
    it('should set loading prop to true', () => {
      const action = ConversationActions.loadPrivateConversation({ userId: 0 });
      const result = conversationReducer(initialConversationState, action);
      expect(result.conversation).toEqual(
        initialConversationState.conversation
      );
      expect(result.loading).toEqual(true);
    });
  });

  describe('PrivateConversationSuccess action', () => {
    it('should set conversation and set loading to false', () => {
      const conversation: Conversation = {
        id: 10,
        messages: [
          {
            id: 0,
            author: UserFactory.create(),
            createdAt: new Date(),
            text: 'test',
          },
        ],
      };

      const action = ConversationActions.privateConversationSuccess({
        conversation,
      });
      const previousState = conversationReducer(
        initialConversationState,
        ConversationActions.loadPrivateConversation({ userId: 0 })
      );
      const result = conversationReducer(previousState, action);
      expect(result.conversation).toEqual(conversation);
      expect(result.loading).toEqual(false);
    });
  });
});
