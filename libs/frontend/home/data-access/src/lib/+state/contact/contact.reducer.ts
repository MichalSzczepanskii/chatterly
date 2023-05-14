import { createReducer, on } from '@ngrx/store';
import * as ContactActions from './contact.actions';
import { Conversation } from '@chatterly/shared/data-access';

export const contactFeatureKey = 'contact';

export interface ContactState {
  contacts: Conversation[];
  loading: boolean;
  error: string | null;
}

export const initialContactState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};

export const contactReducer = createReducer(
  initialContactState,

  on(ContactActions.loadContacts, state => ({ ...state, loading: true })),
  on(ContactActions.loadContactsSuccess, (state, { conversations }) => ({
    ...state,
    contacts: conversations,
    loading: false,
    error: null,
  })),
  on(ContactActions.loadContactsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error.error?.message ?? 'error',
  }))
);
