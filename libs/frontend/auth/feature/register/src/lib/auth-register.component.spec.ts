import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AuthRegisterComponent } from './auth-register.component';
import { MockDeclarations, MockProviders } from 'ng-mocks';
import { AuthCardComponent } from '@chatterly/frontend/auth/ui/card';
import {
  findEl,
  getTranslocoModule,
  markFieldAsBlurred,
  setFieldValue,
} from '@chatterly/frontend/shared/spec-utils';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SignupData } from '@chatterly/shared/data-access';
import { RegisterService } from '@chatterly/frontend/auth/data-access';
import { EmailValidator } from '@chatterly/frontend/auth/utils';
import { of, throwError } from 'rxjs';
import { AlertService } from '@chatterly/frontend/shared/services/alert';
import { TranslocoPipe } from '@ngneat/transloco';
import { FrontendControlErrorsComponent } from '@chatterly/frontend/shared/ui/control-errors';

describe('AuthRegisterComponent', () => {
  let component: AuthRegisterComponent;
  let fixture: ComponentFixture<AuthRegisterComponent>;
  let registerService: RegisterService;
  let emailValidator: EmailValidator;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthRegisterComponent,
        MockDeclarations(AuthCardComponent),
      ],
      imports: [
        getTranslocoModule(),
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        FrontendControlErrorsComponent,
      ],
      providers: [MockProviders(RegisterService, EmailValidator, AlertService)],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthRegisterComponent);
    registerService = TestBed.inject(RegisterService);
    emailValidator = TestBed.inject(EmailValidator);
    alertService = TestBed.inject(AlertService);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#ngOnInit()', () => {
    it('should create a form group', () => {
      expect(component.form).toBeUndefined();
      fixture.detectChanges();
      expect(component.form).toBeTruthy();
    });
  });

  describe('interface interactions', () => {
    it('should redirect to /login after click to login button', () => {
      fixture.detectChanges();
      const href = fixture.debugElement
        .query(By.css('[data-cy="loginRedirect"]'))
        .nativeElement.getAttribute('href');
      fixture.detectChanges();
      expect(href).toEqual('/login');
    });
  });

  describe('form', () => {
    const signupData: SignupData = {
      name: 'testUser',
      email: 'testUser@gmail.com',
      password: 'root12',
      passwordConfirmation: 'root12',
    };
    let translocoSpy: jest.SpyInstance;

    const fillForm = () => {
      setFieldValue(fixture, 'nameField', signupData.name);
      setFieldValue(fixture, 'emailField', signupData.email);
      setFieldValue(fixture, 'passwordField', signupData.password);
      setFieldValue(
        fixture,
        'passwordConfirmationField',
        signupData.passwordConfirmation
      );
      markFieldAsBlurred(fixture, 'nameField');
      markFieldAsBlurred(fixture, 'emailField');
      markFieldAsBlurred(fixture, 'passwordField');
      markFieldAsBlurred(fixture, 'passwordConfirmationField');
    };

    const expectEmptyPasswords = () => {
      expect(component.form.controls['password'].value).toBeNull();
      expect(component.form.controls['passwordConfirmation'].value).toBeNull();
    };

    const submitForm = () => {
      findEl(fixture, 'form').triggerEventHandler('submit', {});
    };

    beforeEach(() => {
      jest.spyOn(emailValidator, 'isEmailTaken').mockReturnValue(of(null));
      jest.spyOn(registerService, 'register').mockReturnValue(of(null));
      translocoSpy = jest.spyOn(TranslocoPipe.prototype, 'transform');
    });

    it('should submits the form successfully', fakeAsync(async () => {
      jest.spyOn(emailValidator, 'isEmailTaken').mockReturnValue(of(null));
      jest.spyOn(alertService, 'showSuccess');
      fixture.detectChanges();
      fillForm();
      fixture.detectChanges();
      submitForm();
      expect(emailValidator.isEmailTaken).toHaveBeenCalled();
      expect(registerService.register).toHaveBeenCalledWith(signupData);
      expect(alertService.showSuccess).toHaveBeenCalledWith({
        message: 'register.success',
      });
      expect(component.form.value).toEqual({
        name: null,
        email: null,
        password: null,
        passwordConfirmation: null,
      });
    }));

    it('should not submit an empty form', () => {
      fixture.detectChanges();
      submitForm();
      expect(component.form.touched).toBeTruthy();
      expect(emailValidator.isEmailTaken).not.toHaveBeenCalled();
      expect(registerService.register).not.toHaveBeenCalled();
    });

    it('should not trigger email validator while typing', () => {
      fixture.detectChanges();
      setFieldValue(fixture, 'emailField', signupData.email);
      expect(emailValidator.isEmailTaken).not.toHaveBeenCalled();
    });

    it('should handle register failure', () => {
      jest
        .spyOn(registerService, 'register')
        .mockReturnValue(throwError(() => new Error('error')));
      jest.spyOn(alertService, 'showError');
      fixture.detectChanges();

      fillForm();
      submitForm();

      expect(emailValidator.isEmailTaken).toHaveBeenCalled();
      expect(registerService.register).toHaveBeenCalled();
      expect(alertService.showError).toHaveBeenCalledWith({
        message: 'register.error',
      });
      expectEmptyPasswords();
    });

    it('should marks fields as required', () => {
      const requiredFields = [
        'email',
        'name',
        'password',
        'passwordConfirmation',
      ];
      fixture.detectChanges();
      requiredFields.forEach(fieldName => {
        markFieldAsBlurred(fixture, fieldName + 'Field');
      });
      fixture.detectChanges();
      requiredFields.forEach(fieldName => {
        const errorMessageEl = findEl(
          fixture,
          `control-error-${fieldName}`
        ).nativeElement;
        if (!errorMessageEl) {
          throw new Error(`Error message for element ${fieldName} not present`);
        }

        expect(errorMessageEl.textContent).toBeTruthy();
        expect(translocoSpy).toHaveBeenCalledWith(
          `validation.${fieldName}.required`
        );
      });
    });

    it('should fails if the email is taken', () => {
      jest
        .spyOn(emailValidator, 'isEmailTaken')
        .mockReturnValue(of({ isEmailTaken: true }));
      fixture.detectChanges();
      fillForm();
      fixture.detectChanges();
      expect(emailValidator.isEmailTaken).toHaveBeenCalled();
      const errorMessageEl = findEl(
        fixture,
        `control-error-email`
      ).nativeElement;
      if (!errorMessageEl) {
        throw new Error('Error message for element email not present');
      }
      expect(errorMessageEl.textContent).toBeTruthy();
      expect(translocoSpy).toHaveBeenCalledWith(`validation.email.taken`);
    });

    it('should fails if email is not valid', () => {
      fixture.detectChanges();
      fillForm();
      setFieldValue(fixture, 'emailField', 'notvalidmail');
      markFieldAsBlurred(fixture, 'emailField');
      fixture.detectChanges();
      const errorMessageEl = findEl(
        fixture,
        `control-error-email`
      ).nativeElement;
      if (!errorMessageEl) {
        throw new Error('Error message for element email not present');
      }
      expect(errorMessageEl.textContent).toBeTruthy();
      expect(translocoSpy).toHaveBeenCalledWith(`validation.email.invalid`);
    });

    it('should fails if passwords are not the same', () => {
      fixture.detectChanges();
      fillForm();
      setFieldValue(fixture, 'passwordConfirmationField', 'wrongPassword');
      markFieldAsBlurred(fixture, 'passwordConfirmationField');
      fixture.detectChanges();
      const errorMessageEl = findEl(
        fixture,
        `control-error-password-validation`
      ).nativeElement;
      if (!errorMessageEl) {
        throw new Error(
          'Error message for element password validation not present'
        );
      }
      expect(errorMessageEl.textContent).toBeTruthy();
      expect(translocoSpy).toHaveBeenCalledWith(
        `validation.passwordConfirmation.mismatch`
      );
    });

    it('should fails if name is shorter than 5 characters', () => {
      fixture.detectChanges();
      fillForm();
      setFieldValue(fixture, 'nameField', 'test');
      markFieldAsBlurred(fixture, 'nameField');
      fixture.detectChanges();
      const errorMessageEl = findEl(
        fixture,
        `control-error-name`
      ).nativeElement;
      if (!errorMessageEl) {
        throw new Error(
          'Error message for element name validation not present'
        );
      }
      expect(errorMessageEl.textContent).toBeTruthy();
      expect(translocoSpy).toHaveBeenCalledWith('validation.name.minLength', {
        minLength: 5,
      });
    });

    it('should clear passwords if invalid form is submitted', () => {
      fixture.detectChanges();
      fillForm();
      setFieldValue(fixture, 'emailField', null);
      markFieldAsBlurred(fixture, 'emailField');
      fixture.detectChanges();
      submitForm();
      expect(component.form.touched).toBeTruthy();
      expectEmptyPasswords();
      expect(registerService.register).not.toHaveBeenCalled();
    });
  });
});
