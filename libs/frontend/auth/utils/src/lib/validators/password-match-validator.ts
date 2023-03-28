import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordMatchValidator {
  public static checkPassword(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('passwordConfirmation')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }
}
