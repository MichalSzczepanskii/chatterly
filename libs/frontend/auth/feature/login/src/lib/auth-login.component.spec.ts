import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginComponent } from './auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MockDeclarations, MockModule } from 'ng-mocks';
import { AuthCardComponent } from '@chatterly/frontend/auth/ui/card';
import { loginRequest } from '@chatterly/frontend/shared/data-access';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { getTranslocoModule } from '@chatterly/frontend/shared/spec-utils';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthLoginModule } from './auth-login.module';

describe('FrontendAuthFeatureLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let store: Store;
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
        RouterTestingModule,
        MockModule(AuthLoginModule),
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
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
      jest.spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.form.controls['email'].setValue(mockUser.email);
      component.form.controls['password'].setValue(mockUser.password);
    });

    it('should dispatch LoginRequest', () => {
      component.login();
      expect(store.dispatch).toHaveBeenCalledWith(
        loginRequest({
          email: mockUser.email,
          password: mockUser.password,
        })
      );
    });
  });

  describe('interface interactions', () => {
    it('should redirect to /register after click to register button', () => {
      fixture.detectChanges();
      const href = fixture.debugElement
        .query(By.css('[data-cy="registerRedirect"]'))
        .nativeElement.getAttribute('href');
      fixture.detectChanges();
      expect(href).toEqual('/register');
    });
  });
});
