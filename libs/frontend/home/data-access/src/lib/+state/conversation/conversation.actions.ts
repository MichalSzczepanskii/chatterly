import { createAction, props } from '@ngrx/store';
import { Conversation } from '@chatterly/shared/data-access';

export const loadPrivateConversation = createAction(
  '[Conversation] Load Private Conversation',
  props<{ userId: number }>()
);

export const privateConversationSuccess = createAction(
  '[Conversation] Private Conversation Success',
  props<{ conversation: Conversation }>()
);
