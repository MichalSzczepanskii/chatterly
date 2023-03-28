import { Injectable } from '@angular/core';
import { RegisterService } from '@chatterly/frontend/auth/data-access';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailValidator {
  constructor(private registerService: RegisterService) {}

  isEmailTaken(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.registerService.isEmailTaken(control.value).pipe(
      map(isTaken => {
        return isTaken ? { isEmailTaken: true } : null;
      })
    );
  }
}
