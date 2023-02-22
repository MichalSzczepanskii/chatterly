import { Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { authReducer, AuthState, initialState } from './auth.reducer';
import { User } from '@chatterly/shared/data-access';

describe('Auth Reducer', () => {
  const testUser: User = {
    id: 0,
    name: 'testUser',
    email: 'test@localhost',
    isActive: true,
  };
  const testError = { error: { statusCode: 401, message: 'test' } };
  const testToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXN0QGxvY2FsaG9zdCIsInN1YiI6MiwiaWF0IjoxNjc0MjEzNDM5LCJleHAiOjE2NzQyMTcwMzl9.6s-v2yPht59pZUrjKlsI3sygWpVfJbAabhwtWdaj3uM';

  describe('valid Auth actions', () => {
    it('LoginRequest should return pending as true', () => {
      const action = AuthActions.loginRequest({ email: 'test', password: 'test' });
      const result: AuthState = authReducer(initialState, action);
      expect(result.pending).toBe(true);
      expect(result.user).toEqual(null);
      expect(result.token).toEqual(null);
      expect(result.expiresAt).toEqual(null);
      expect(result.loginError).toBeUndefined();
    });

    it('LoginSuccess should return token, user and expiresAt', () => {
      const action = AuthActions.loginSuccess({
        loginSuccessResponse: {
          access_token: testToken,
          user: testUser,
        },
      });

      const result: AuthState = authReducer(initialState, action);

      expect(result.pending).toBe(false);
      expect(result.user).toBe(testUser);
      expect(result.token).toEqual(testToken);
      expect(result.expiresAt).toEqual('2023-01-20T12:17:19.000Z');
      expect(result.loginError).toBeUndefined();
    });

    it('LoginFailure should return loginError', () => {
      const action = AuthActions.loginFailure({ error: testError });
      const result: AuthState = authReducer(initialState, action);
      expect(result.pending).toBe(false);
      expect(result.user).toEqual(null);
      expect(result.token).toEqual(null);
      expect(result.expiresAt).toEqual(null);
      expect(result.loginError).toBe(testError);
    });

    it('Logout should clear state', () => {
      const actionLogin = AuthActions.loginRequest({ email: 'test', password: 'test' });
      let result: AuthState = authReducer(initialState, actionLogin);
      expect(result.pending).toBe(true);
      const actionLogout = AuthActions.logout();
      result = authReducer(initialState, actionLogout);
      expect(result).toEqual(initialState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = authReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
