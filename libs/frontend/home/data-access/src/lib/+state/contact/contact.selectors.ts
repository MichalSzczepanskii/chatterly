import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContact from './contact.reducer';

export const selectContactState =
  createFeatureSelector<fromContact.ContactState>(
    fromContact.contactFeatureKey
  );

export const selectContactsLoading = createSelector(
  selectContactState,
  state => state.loading
);

export const selectContacts = createSelector(
  selectContactState,
  state => state.contacts
);
