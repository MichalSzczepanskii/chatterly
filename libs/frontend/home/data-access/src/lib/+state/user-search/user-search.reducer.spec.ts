import { Action } from '@ngrx/store';

import { initialState, reducer } from './user-search.reducer';
import * as UserSearchActions from './user-search.actions';
import { UserFactory } from '@chatterly/frontend/shared/spec-utils';

describe('UserSearch Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('LoadSearchUser action', () => {
    it('should set loading prop to true', () => {
      const action = UserSearchActions.loadUsersSearch({ name: 'test' });
      const result = reducer(initialState, action);
      expect(result.users).toBe(initialState.users);
      expect(result.loading).toBe(true);
    });
  });

  describe('SearchUserSuccess', () => {
    it('should set users array and loading to false', () => {
      const users = UserFactory.createMany(5);
      const action = UserSearchActions.userSearchSuccess({ users });
      const previousResult = reducer(
        initialState,
        UserSearchActions.loadUsersSearch({ name: 'test' })
      );
      const result = reducer(previousResult, action);
      expect(result.users).toBe(users);
      expect(result.loading).toBe(false);
    });
  });

  describe('SearchUserFailure', () => {
    it('should set loading to false and error with description', () => {
      const error = 'error';
      const previousResult = reducer(
        initialState,
        UserSearchActions.loadUsersSearch({ name: 'test' })
      );
      const action = UserSearchActions.userSearchFailure({ error });
      const result = reducer(previousResult, action);
      expect(result.error).toBe(error);
      expect(result.loading).toBe(false);
    });
  });

  describe('ClearUserSearch', () => {
    it('should set users array to null', () => {
      const users = UserFactory.createMany(5);
      const action = UserSearchActions.clearUserSearch();
      const result = reducer({ ...initialState, users }, action);
      expect(result.users).toEqual(null);
    });
  });
});
