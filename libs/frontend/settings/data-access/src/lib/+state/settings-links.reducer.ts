import { NavItem } from '@chatterly/frontend/shared/data-access';
import { Action, createReducer } from '@ngrx/store';

export interface SettingsLinksState {
  items: (NavItem & { description: string })[];
}

export const initialState: SettingsLinksState = {
  items: [
    {
      label: 'settings.account.title',
      description: 'settings.account.description',
      path: 'account',
      icon: 'las la-user-circle',
      exact: true,
    },
    {
      label: 'settings.security.title',
      description: 'settings.security.description',
      path: '',
      icon: 'las la-key',
      exact: true,
    },
    {
      label: 'settings.notifications.title',
      description: 'settings.notifications.description',
      path: '',
      icon: 'las la-bell',
      exact: true,
    },
  ],
};

const _settingsLinksReducer = createReducer(initialState);

export function settingsLinksReducer(state = initialState, action: Action) {
  return _settingsLinksReducer(state, action);
}
