import { createAction, props } from '@ngrx/store';
import { ApiError, Conversation } from '@chatterly/shared/data-access';

export const loadContacts = createAction('[Contact] Load Contacts');
export const loadContactsSuccess = createAction(
  '[Contact] Load Contacts Success',
  props<{ conversations: Conversation[] }>()
);
export const loadContactsFailure = createAction(
  '[Contact] Load Contacts Failure',
  props<{ error: ApiError }>()
);
