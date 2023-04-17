import { NavItem } from '../../models/nav-item';
import { Action, createReducer } from '@ngrx/store';

export interface UiState {
  navItems: NavItem[];
}

export const initialUiState: UiState = {
  navItems: [
    { label: 'Home', path: '/app', icon: 'las la-sms', exact: true },
    { label: 'Profile', path: '', icon: 'las la-user', exact: true },
    { label: 'Test', path: '', icon: 'las la-bell', exact: true },
  ],
};

const _uiReducer = createReducer(initialUiState);

export function uiReducer(state = initialUiState, action: Action) {
  return _uiReducer(state, action);
}
