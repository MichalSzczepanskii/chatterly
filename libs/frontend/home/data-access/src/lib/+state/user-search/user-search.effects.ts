import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as UserSearchActions from './user-search.actions';
import { UserSearchService } from '../../services/user-search.service';
import { of } from 'rxjs';

@Injectable()
export class UserSearchEffects {
  loadUserSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserSearchActions.loadUsersSearch),
      exhaustMap(action =>
        this.userSearchService.searchByName(action.name).pipe(
          map(users => UserSearchActions.userSearchSuccess({ users })),
          catchError(err =>
            of(
              UserSearchActions.userSearchFailure({ error: err.error.message })
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private userSearchService: UserSearchService
  ) {}
}
