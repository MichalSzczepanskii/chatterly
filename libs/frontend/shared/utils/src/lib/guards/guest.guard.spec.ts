import { TestBed } from '@angular/core/testing';

import { GuestGuard } from './guest.guard';
import { AuthService } from '@chatterly/frontend/auth/data-access';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';

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
    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);
  });

  describe('#canActivate()', () => {
    it('should call #isLoggedIn() from AuthService', () => {
      guard.canActivate(dummyRoute, dummyStateSnapshot);
      expect(authService.isLoggedIn).toHaveBeenCalledTimes(1);
    });

    it('should return true if user is not logged in', () => {
      expect(guard.canActivate(dummyRoute, dummyStateSnapshot)).toEqual(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to app page if user is logged in', () => {
      authService.isLoggedIn = jest.fn(() => true);
      guard.canActivate(dummyRoute, dummyStateSnapshot);
      expect(router.navigate).toHaveBeenCalledWith(['/app']);
    });
  });
});
