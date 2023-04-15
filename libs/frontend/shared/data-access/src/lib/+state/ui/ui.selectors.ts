import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';

export const selectUiState = createFeatureSelector<UiState>('ui');
export const selectAllNavItems = createSelector(
  selectUiState,
  (state: UiState) => state.navItems
);
