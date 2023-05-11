import { createAction, props } from '@ngrx/store';
import { User } from '@chatterly/shared/data-access';

export const loadUsersSearch = createAction(
  '[UserSearch] Load UserSearch',
  props<{ name: string }>()
);

export const userSearchSuccess = createAction(
  '[UserSearch] UserSearch success',
  props<{ users: User[] }>()
);

export const userSearchFailure = createAction(
  '[UserSearch] UserSearch failure',
  props<{ error: string }>()
);
