import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ContactState,
  loadContacts,
  loadUsersSearch,
  selectContacts,
  selectContactsLoading,
  selectUserSearchLoading,
  selectUserSearchUsers,
  UserSearchState,
} from '@chatterly/frontend/home/data-access';
import { Conversation, User } from '@chatterly/shared/data-access';
import { AuthState, selectUser } from '@chatterly/frontend/shared/data-access';

@Component({
  selector: 'chatterly-frontend-home-feature-home',
  templateUrl: './frontend-home-feature-home.component.html',
  styleUrls: ['./frontend-home-feature-home.component.scss'],
})
export class FrontendHomeFeatureHomeComponent implements OnInit {
  searchForm!: FormGroup;
  searchedUsers!: Observable<User[]>;
  userSearchLoading$!: Observable<boolean>;
  contactLoading$!: Observable<boolean>;
  contacts$!: Observable<Conversation[]>;
  constructor(
    private formBuilder: FormBuilder,
    private userSearchStore: Store<UserSearchState>,
    private contactStore: Store<ContactState>,
    private authStore: Store<AuthState>
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      keyword: [],
    });

    this.contactStore.dispatch(loadContacts());

    this.searchForm
      .get('keyword')
      ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(keyword => {
        if (!keyword) return;
        this.userSearchStore.dispatch(loadUsersSearch({ name: keyword }));
      });

    this.searchedUsers = this.userSearchStore.select(selectUserSearchUsers);
    this.userSearchLoading$ = this.userSearchStore.select(
      selectUserSearchLoading
    );
    this.contactLoading$ = this.contactStore.select(selectContactsLoading);
    this.contacts$ = this.authStore.select(selectUser).pipe(
      switchMap(user =>
        this.contactStore.select(selectContacts).pipe(
          map(contacts =>
            contacts.map(contact => {
              const contactsCopy = Object.assign({}, contact);
              contactsCopy.users = contactsCopy.users.filter(
                participant => participant.id !== user?.id
              );
              return contactsCopy;
            })
          )
        )
      )
    );
  }
}
