import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';
import { MockProviders } from 'ng-mocks';
import { AuthService } from '../../auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@chatterly/shared/data-access';
import { Router } from '@angular/router';
import {
  BlankComponent,
  getTranslocoModule,
} from '@chatterly/frontend/shared/spec-utils';

describe('AuthEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthEffects;
  let authService: AuthService;
  let router: Router;
  let toastService: ToastrService;
  let translocoService: TranslocoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        RouterTestingModule.withRoutes([
          { path: 'app', component: BlankComponent },
        ]),
        ToastrModule.forRoot(),
      ],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        MockProviders(AuthService, ToastrService),
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastrService);
    translocoService = TestBed.inject(TranslocoService);
  });

  describe('loginRequest$', () => {
    it('should return LoginSuccessAction', () => {
      jest
        .spyOn(authService, 'login')
        .mockReturnValue(of({ user: {} as User, access_token: 'test' }));
      actions = hot('-a-|', {
        a: AuthActions.loginRequest({ email: 'test', password: 'test' }),
      });

      const expected = hot('-a-|', {
        a: AuthActions.loginSuccess({
          loginSuccessResponse: { user: {} as User, access_token: 'test' },
        }),
      });

      expect(effects.loginRequest$).toBeObservable(expected);
    });

    it('should return LoginFailureAction', () => {
      jest
        .spyOn(authService, 'login')
        .mockReturnValue(
          throwError(() => ({ error: { message: 'test', statusCode: 401 } }))
        );
      actions = hot('-a-|', {
        a: AuthActions.loginRequest({ email: 'test', password: 'test' }),
      });

      const expected = hot('-a-|', {
        a: AuthActions.loginFailure({
          error: { error: { message: 'test', statusCode: 401 } },
        }),
      });

      expect(effects.loginRequest$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should navigate to /app', () => {
      jest.spyOn(router, 'navigateByUrl');
      actions = of(
        AuthActions.loginSuccess({
          loginSuccessResponse: { user: {} as User, access_token: 'test' },
        })
      );

      effects.loginSuccess$.subscribe();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/app');
    });
  });

  describe('loginFailure$', () => {
    beforeEach(() => {
      jest.spyOn(toastService, 'error');
      jest.spyOn(translocoService, 'translate');
    });
    it('should display alert with transloco.translate("login.badCredentials")', () => {
      actions = hot('-a-|', {
        a: AuthActions.loginFailure({
          error: { error: { message: 'test', statusCode: 401 } },
        }),
      });

      effects.loginFailure$.subscribe(() => {
        expect(toastService.error).toHaveBeenCalled();
        expect(translocoService.translate).toHaveBeenCalledWith(
          'login.badCredentials'
        );
      });
    });

    it('should display alert with error message when statusCode is different than 401', () => {
      actions = hot('-a-|', {
        a: AuthActions.loginFailure({
          error: { error: { message: 'test', statusCode: 403 } },
        }),
      });
      effects.loginFailure$.subscribe(() => {
        expect(toastService.error).toHaveBeenCalledWith('test');
        expect(translocoService.translate).not.toHaveBeenCalled();
      });
    });

    it('should display alert with transloco.translate("login.error") if statusCode is different than 401 and there is not a message field', () => {
      actions = hot('-a-|', {
        a: AuthActions.loginFailure({ error: { error: { statusCode: 403 } } }),
      });
      effects.loginFailure$.subscribe(() => {
        expect(toastService.error).toHaveBeenCalled();
        expect(translocoService.translate).toHaveBeenCalledWith('login.error');
      });
    });
  });

  describe('logout', () => {
    it('should navigate to root page', () => {
      jest.spyOn(router, 'navigateByUrl');
      actions = of(AuthActions.logout());
      effects.logout$.subscribe();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });
});
