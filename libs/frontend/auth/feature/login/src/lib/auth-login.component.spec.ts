import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginComponent } from './auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MockDeclarations } from 'ng-mocks';
import { AuthCardComponent } from '@chatterly/frontend/auth/ui/card';
import { loginRequest } from '@chatterly/frontend/shared/data-access';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { getTranslocoModule } from '@chatterly/frontend/shared/spec-utils';

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
      imports: [getTranslocoModule(), ReactiveFormsModule],
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
});
