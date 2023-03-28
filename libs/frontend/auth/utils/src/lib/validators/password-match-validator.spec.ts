import { FormControl, FormGroup } from '@angular/forms';
import { PasswordMatchValidator } from './password-match-validator';

describe('PasswordMatchValidator', () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      password: new FormControl(),
      passwordConfirmation: new FormControl(),
    });
  });

  it('should return null if passwords are the same', () => {
    formGroup.setValue({
      password: 'root12',
      passwordConfirmation: 'root12',
    });
    expect(PasswordMatchValidator.checkPassword(formGroup)).toBeNull();
  });

  it('should return true if passwords are not the same', () => {
    formGroup.setValue({
      password: 'root12',
      passwordConfirmation: 'root123',
    });
    expect(PasswordMatchValidator.checkPassword(formGroup)).toEqual({
      passwordMismatch: true,
    });
  });

  it('should return true if passwords are null', () => {
    expect(PasswordMatchValidator.checkPassword(formGroup)).toEqual({
      passwordMismatch: true,
    });
  });
});
