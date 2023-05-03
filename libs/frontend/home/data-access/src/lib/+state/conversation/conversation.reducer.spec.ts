import {
  conversationReducer,
  initialConversationState,
} from './conversation.reducer';
import * as ConversationActions from './conversation.actions';
import { Conversation, Message } from '@chatterly/shared/data-access';
import { UserFactory } from '@chatterly/frontend/shared/spec-utils';

describe('Conversation Reducer', () => {
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
    users: UserFactory.createMany(2),
  };

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

  describe('SendPrivateMessage action', () => {
    it('should append message to messages array', () => {
      const message: Message = {
        id: 10,
        text: 'test',
        author: UserFactory.create(),
        createdAt: new Date(),
      };

      const previousAction = ConversationActions.privateConversationSuccess({
        conversation,
      });
      const initialState = conversationReducer(
        initialConversationState,
        ConversationActions.loadPrivateConversation({ userId: 0 })
      );
      const previousState = conversationReducer(initialState, previousAction);
      const action = ConversationActions.sendPrivateMessage({ message });
      const result = conversationReducer(previousState, action);
      expect(result.conversation.messages).toContain(message);
      conversation.messages.map(message =>
        expect(result.conversation.messages).toContain(message)
      );
    });
  });
});
