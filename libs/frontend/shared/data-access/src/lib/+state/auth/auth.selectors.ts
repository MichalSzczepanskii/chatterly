import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
export const selectExpiresAt = createSelector(
  selectAuthState,
  (state: AuthState) => state.expiresAt
);
export const selectPending = createSelector(
  selectAuthState,
  (state: AuthState) => state.pending
);
