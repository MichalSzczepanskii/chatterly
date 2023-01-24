import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.reducer';

export const selectAuthState = createFeatureSelector<State>('auth');
export const selectToken = createSelector(selectAuthState, (state: State) => state.token);
export const selectUser = createSelector(selectAuthState, (state: State) => state.user);
export const selectExpiresAt = createSelector(selectAuthState, (state: State) => state.expiresAt);
export const selectPending = createSelector(selectAuthState, (state: State) => state.pending);
