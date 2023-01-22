import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '@chatterly/frontend/shared/data-access';

@Component({
  selector: 'chatterly-frontend-auth-feature-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/app']);
      },
      error: err => {
        let msg = '';
        if (err?.error?.statusCode === 401) msg = this.translocoService.translate('login.badCredentials');
        else msg = err?.error?.message || this.translocoService.translate('login.error');
        this.toastService.error(msg);
      },
    });
  }
}
