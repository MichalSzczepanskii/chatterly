import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { UserSearchEffects } from './user-search.effects';
import { UserSearchService } from '../user-search.service';
import { UserFactory } from '@chatterly/frontend/shared/spec-utils';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as UserSearchActions from './user-search.actions';

describe('UserSearchEffects', () => {
  let actions$: Observable<any>;
  let effects: UserSearchEffects;
  let userSearchService: UserSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserSearchEffects,
        provideMockActions(() => actions$),
        UserSearchService,
      ],
      imports: [HttpClientTestingModule],
    });

    effects = TestBed.inject(UserSearchEffects);
    userSearchService = TestBed.inject(UserSearchService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('LoadUserSearch', () => {
    it('should return UserSearchSuccess', done => {
      const users = UserFactory.createMany(10);
      const keyword = 'test';
      jest.spyOn(userSearchService, 'searchByName').mockReturnValue(of(users));

      actions$ = of({
        type: UserSearchActions.loadUsersSearch.type,
        name: keyword,
      });
      effects.loadUserSearch$.subscribe(action => {
        expect(userSearchService.searchByName).toHaveBeenCalledWith(keyword);
        expect(action).toEqual({
          type: UserSearchActions.userSearchSuccess.type,
          users: users,
        });
        done();
      });
    });

    it('should return UserSearchFailure on error', done => {
      const keyword = 'test';
      const errorMessage = 'error';
      jest
        .spyOn(userSearchService, 'searchByName')
        .mockReturnValue(
          throwError(() => ({ error: { message: errorMessage } }))
        );

      actions$ = of({
        type: UserSearchActions.loadUsersSearch.type,
        name: keyword,
      });
      effects.loadUserSearch$.subscribe(action => {
        expect(action).toEqual({
          type: UserSearchActions.userSearchFailure.type,
          error: errorMessage,
        });
        done();
      });
    });
  });
});
