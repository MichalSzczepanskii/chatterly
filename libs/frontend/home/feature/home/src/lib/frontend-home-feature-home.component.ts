import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadUsersSearch,
  selectUserSearchLoading,
  selectUserSearchUsers,
  UserSearchState,
} from '@chatterly/frontend/home/data-access';
import { User } from '@chatterly/shared/data-access';

@Component({
  selector: 'chatterly-frontend-home-feature-home',
  templateUrl: './frontend-home-feature-home.component.html',
  styleUrls: ['./frontend-home-feature-home.component.scss'],
})
export class FrontendHomeFeatureHomeComponent implements OnInit {
  searchForm!: FormGroup;
  searchedUsers!: Observable<User[]>;
  contactLoading!: Observable<boolean>;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<UserSearchState>
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      keyword: [],
    });

    this.searchForm
      .get('keyword')
      ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(keyword => {
        if (!keyword) return;
        this.store.dispatch(loadUsersSearch({ name: keyword }));
      });

    this.searchedUsers = this.store.select(selectUserSearchUsers);
    this.contactLoading = this.store.select(selectUserSearchLoading);
  }
}
