import { TestBed } from '@angular/core/testing';

import { GuestGuard } from './guest.guard';
import { AuthService } from '@chatterly/frontend/shared/data-access';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

describe('GuestGuard', () => {
  let guard: GuestGuard;
  let authService: AuthService;
  let router: Router;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyStateSnapshot = {} as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [GuestGuard, MockProvider(AuthService)],
    }).compileComponents();
  });

  beforeEach(() => {
    guard = TestBed.inject(GuestGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(of(false));
  });

  describe('#canActivate()', () => {
    it('should call #isLoggedIn() from AuthService', () => {
      guard.canActivate(dummyRoute, dummyStateSnapshot).subscribe(() => {
        expect(authService.isLoggedIn).toHaveBeenCalledTimes(1);
      });
    });

    it('should return true if user is not logged in', () => {
      guard.canActivate(dummyRoute, dummyStateSnapshot).subscribe(canActivate => {
        expect(canActivate).toEqual(true);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    it('should navigate to app page if user is logged in', () => {
      authService.isLoggedIn = jest.fn(() => of(true));
      guard.canActivate(dummyRoute, dummyStateSnapshot).subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/app']);
      });
    });
  });
});
