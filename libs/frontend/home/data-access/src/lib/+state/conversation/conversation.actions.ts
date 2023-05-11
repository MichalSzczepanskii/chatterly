import { createAction, props } from '@ngrx/store';
import { Conversation, Message } from '@chatterly/shared/data-access';

export const loadPrivateConversation = createAction(
  '[Conversation] Load Private Conversation'
);

export const privateConversationSuccess = createAction(
  '[Conversation] Private Conversation Success',
  props<{ conversation: Conversation }>()
);

export const sendPrivateMessage = createAction(
  '[Conversation] Send private message',
  props<{ userId: number; message: Message }>()
);
