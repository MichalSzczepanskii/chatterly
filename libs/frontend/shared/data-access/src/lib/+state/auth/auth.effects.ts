import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';

import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../user.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private translocoService: TranslocoService,
    private toastService: ToastrService,
    private userService: UserService
  ) {}

  loginRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap(action => {
        return this.authService
          .login({
            email: action.email,
            password: action.password,
          })
          .pipe(
            map(loginSuccessResponse => {
              return AuthActions.loginSuccess({ loginSuccessResponse });
            }),
            catchError(error => of(AuthActions.loginFailure({ error })))
          );
      })
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ loginSuccessResponse }) => {
          this.router.navigateByUrl('/app');
        })
      );
    },
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          let msg = '';
          if (error?.error?.statusCode === 401)
            msg = this.translocoService.translate('login.badCredentials');
          else
            msg =
              error?.error?.message ||
              this.translocoService.translate('login.error');
          this.toastService.error(msg);
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      );
    },
    { dispatch: false }
  );

  userDataRefresh$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userDataRefresh),
      exhaustMap(() => {
        return this.authService.getMe().pipe(
          mergeMap(user => {
            if (!user?.profileImage) return of(user);
            return this.userService.getProfileImage(user.profileImage).pipe(
              map(profileImageFile => {
                return { ...user, profileImageFile: profileImageFile };
              })
            );
          }),
          map(user => AuthActions.userDataRefreshSuccess({ user }))
        );
      })
    );
  });
}
