import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { RegisterService } from '@chatterly/frontend/auth/data-access';
import { EmailValidator } from '@chatterly/frontend/auth/utils';
import { AlertService } from '@chatterly/frontend/shared/services/alert';
import PasswordMatchValidator from '../../../../utils/src/lib/validators/password-match-validator';

const { required, email, minLength } = Validators;
@Component({
  selector: 'chatterly-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private emailValidator: EmailValidator,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        email: [
          null,
          {
            validators: [required, email],
            asyncValidators: this.emailValidator.isEmailTaken.bind(
              this.emailValidator
            ),
            updateOn: 'blur',
          },
        ],
        name: [null, [required, minLength(5)]],
        password: [null, required],
        passwordConfirmation: [null, required],
      },
      { validators: PasswordMatchValidator.checkPassword, updateOn: 'blur' }
    );
  }

  register(formDirective: FormGroupDirective) {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.clearPasswords();
      return;
    }
    this.registerService.register(this.form.value).subscribe({
      next: () => {
        this.alertService.showSuccess({ message: 'register.success' });
        formDirective.resetForm();
      },
      error: () => {
        this.alertService.showError({ message: 'register.error' });
        this.clearPasswords();
      },
    });
  }

  private clearPasswords() {
    this.form.controls['password'].reset();
    this.form.controls['passwordConfirmation'].reset();
    this.form.controls['passwordConfirmation'].markAsPristine();
  }
}
