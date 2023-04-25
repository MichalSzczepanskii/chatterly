import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserSearch from './user-search.reducer';

export const selectUserSearchState =
  createFeatureSelector<fromUserSearch.UserSearchState>(
    fromUserSearch.userSearchFeatureKey
  );

export const selectUserSearchLoading = createSelector(
  selectUserSearchState,
  state => state.loading
);

export const selectUserSearchUsers = createSelector(
  selectUserSearchState,
  state => state.users
);
