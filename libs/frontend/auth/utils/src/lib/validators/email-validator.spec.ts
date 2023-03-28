import { TestBed } from '@angular/core/testing';

import { EmailValidator } from './email-validator';
import { MockProvider } from 'ng-mocks';
import { RegisterService } from '@chatterly/frontend/auth/data-access';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';

describe('EmailValidator', () => {
  let validator: EmailValidator;
  let registerService: RegisterService;
  let formControl: FormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(RegisterService)],
    });
    validator = TestBed.inject(EmailValidator);
    registerService = TestBed.inject(RegisterService);
  });

  describe('#isEmailTaken()', () => {
    beforeEach(() => {
      formControl = new FormControl();
    });

    it('should return null if email is not taken', done => {
      const spy = jest.spyOn(registerService, 'isEmailTaken').mockReturnValue(of(false));
      formControl.setValue('test123@gmail.com');
      validator.isEmailTaken(formControl).subscribe(value => {
        expect(spy).toHaveBeenCalledWith('test123@gmail.com');
        expect(value).toBeNull();
        done();
      });
    });

    it('should return validation error if email is taken', done => {
      const spy = jest.spyOn(registerService, 'isEmailTaken').mockReturnValue(of(true));
      formControl.setValue('test123@gmail.com');
      validator.isEmailTaken(formControl).subscribe(value => {
        expect(spy).toHaveBeenCalledWith('test123@gmail.com');
        expect(value).toEqual({ isEmailTaken: true });
        done();
      });
    });
  });
});
