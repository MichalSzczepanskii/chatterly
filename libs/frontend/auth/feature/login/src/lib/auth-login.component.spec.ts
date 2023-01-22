import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginComponent } from './auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MockDeclarations, MockProviders } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthCardComponent } from '@chatterly/frontend/auth/ui/card';
import { BlankComponent, FixNavigationModule, getTranslocoModule } from '@chatterly/frontend/shared/spec-utils';
import { AuthService } from '@chatterly/frontend/shared/data-access';

describe('FrontendAuthFeatureLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let authService: AuthService;
  let toastService: ToastrService;
  let router: Router;
  const mockUser = {
    email: 'guest@localhost',
    password: 'root12',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLoginComponent, MockDeclarations(AuthCardComponent)],
      imports: [
        getTranslocoModule(),
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{ path: 'app', component: BlankComponent }]),
        ToastrModule.forRoot(),
        FixNavigationModule,
      ],
      providers: [MockProviders(AuthService, ToastrService)],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastrService);
  });

  describe('#ngOnInit()', () => {
    it('should create form group', () => {
      expect(component.form).toBeUndefined();
      fixture.detectChanges();
      expect(component.form).toBeTruthy();
    });
  });

  describe('#login()', () => {
    beforeEach(() => {
      jest.spyOn(authService, 'login');
      authService.login = jest.fn(() => of(null));
      fixture.detectChanges();
      component.form.controls['email'].setValue(mockUser.email);
      component.form.controls['password'].setValue(mockUser.password);
    });

    it('should call #login() from AuthService with form data', () => {
      fixture.detectChanges();
      component.login();
      expect(authService.login).toHaveBeenCalledWith({
        email: mockUser.email,
        password: mockUser.password,
      });
    });

    it('should redirect to /app after successful login', () => {
      jest.spyOn(router, 'navigate').mockImplementation(jest.fn().mockReturnValue(null));
      fixture.detectChanges();
      component.login();
      expect(router.navigate).toHaveBeenCalledWith(['/app']);
    });

    it('should call #error() of ToastService if api returns 401', () => {
      jest.spyOn(toastService, 'error');
      authService.login = jest.fn(() => throwError(() => ({ error: { message: 'Unauthorized', statusCode: 401 } })));
      fixture.detectChanges();
      component.login();
      expect(toastService.error).toHaveBeenCalled();
    });
  });
});
