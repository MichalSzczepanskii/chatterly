import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loginRequest } from '@chatterly/frontend/shared/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'chatterly-frontend-auth-feature-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this.store.dispatch(loginRequest(this.form.value));
  }
}
