import { State } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import { User } from '@chatterly/shared/data-access';

describe('Auth Selectors', () => {
  let state: State;
  const testUser: User = {
    id: 0,
    name: 'testUser',
    email: 'test@localhost',
    isActive: true,
  };

  beforeEach(() => {
    state = {
      user: testUser,
      token: 'testToken',
      expiresAt: 'testExpiresAt',
      pending: false,
    };
  });

  describe('Auth Selectors', () => {
    it('selectToken() should return token', () => {
      const results = AuthSelectors.selectToken.projector(state);

      expect(results).toBe('testToken');
    });

    it('selectExpiresAt() should return expiresAt', () => {
      const result = AuthSelectors.selectExpiresAt.projector(state);
      expect(result).toBe('testExpiresAt');
    });

    it('selectUser() should return user', () => {
      const result = AuthSelectors.selectUser.projector(state);

      expect(result).toBe(testUser);
    });

    it('selectPending() should return the current "pending" state', () => {
      const result = AuthSelectors.selectPending.projector(state);

      expect(result).toBe(false);
    });
  });
});
