import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '@chatterly/frontend/shared/data-access';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyStateSnapshot = {} as RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, MockProvider(AuthService)],
    }).compileComponents();
  });

  beforeEach(() => {
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(of(true));
  });

  describe('#canActivate()', () => {
    it('should call #isLoggedIn() from AuthService', () => {
      guard.canActivate(dummyRoute, dummyStateSnapshot).subscribe(() => {
        expect(authService.isLoggedIn).toHaveBeenCalledTimes(1);
      });
    });

    it('should return true if user is logged in', () => {
      guard.canActivate(dummyRoute, dummyStateSnapshot).subscribe(canActivate => {
        expect(canActivate).toEqual(true);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    it('should navigate to root page if user is not logged in', () => {
      authService.isLoggedIn = jest.fn(() => of(false));
      guard.canActivate(dummyRoute, dummyStateSnapshot).subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });
});
