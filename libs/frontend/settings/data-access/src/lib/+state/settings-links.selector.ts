import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsLinksState } from './settings-links.reducer';

export const selectSettingsLinksState =
  createFeatureSelector<SettingsLinksState>('settingsLinks');

export const selectAllSettingsLinks = createSelector(
  selectSettingsLinksState,
  (state: SettingsLinksState) => state.items
);
