import { createReducer, on } from '@ngrx/store';
import * as UserSearchActions from './user-search.actions';
import { User } from '@chatterly/shared/data-access';

export const userSearchFeatureKey = 'userSearch';

export interface UserSearchState {
  users: User[];
  loading: boolean;
  error?: string;
}

export const initialState: UserSearchState = {
  users: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(UserSearchActions.loadUsersSearch, state => ({ ...state, loading: true })),
  on(UserSearchActions.userSearchSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UserSearchActions.userSearchFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
