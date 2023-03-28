import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendControlErrorsComponent } from './frontend-control-errors.component';
import { Component, Type } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  expectContent,
  findEl,
  setFieldElementValue,
} from '@chatterly/frontend/shared/spec-utils';

describe('FrontendSharedUiControlErrorsComponent', () => {
  let fixture: ComponentFixture<object>;
  let input: HTMLInputElement;

  const setup = async (HostComponent: Type<any>) => {
    await TestBed.configureTestingModule({
      imports: [FrontendControlErrorsComponent, ReactiveFormsModule],
      declarations: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    input = findEl(fixture, 'input').nativeElement;
  };

  describe('passing control name', () => {
    @Component({
      template: `
        <form [formGroup]="form">
          <input formControlName="control" data-cy="input" />
          <chatterly-frontend-control-errors controlName="control">
            <ng-template let-errors>
              <ng-container *ngIf="errors.required">required</ng-container>
            </ng-template>
          </chatterly-frontend-control-errors>
        </form>
      `,
    })
    class HostComponent {
      public control = new FormControl<string>('', Validators.required);
      public form = new FormGroup({ control: this.control });
    }

    beforeEach(async () => {
      await setup(HostComponent);
    });

    describe('valid control', () => {
      it('should renders nothing', () => {
        setFieldElementValue(input, 'something');
        fixture.detectChanges();
        expectContent(fixture, '');
      });
    });

    describe('invalid, pristine, untouched control', () => {
      it('should renders nothing', () => {
        expectContent(fixture, '');
      });
    });

    describe('invalid control, touched', () => {
      it('should renders the template', () => {
        input.dispatchEvent(new FocusEvent('blur'));
        fixture.detectChanges();
        expectContent(fixture, 'required');
      });
    });

    describe('invalid control, dirty', () => {
      it('should renders the template', () => {
        input.dispatchEvent(new FocusEvent('input'));
        fixture.detectChanges();
        expectContent(fixture, 'required');
      });
    });
  });

  describe('without control', () => {
    @Component({
      template: `
        <chatterly-frontend-control-errors controlName="control">
          <ng-template let-errors>
            <ng-container *ngIf="errors.required">required</ng-container>
          </ng-template>
        </chatterly-frontend-control-errors>
      `,
    })
    class HostComponent {}

    it('should throws an error', async () => {
      await TestBed.configureTestingModule({
        imports: [FrontendControlErrorsComponent, ReactiveFormsModule],
        declarations: [HostComponent],
      });

      fixture = TestBed.createComponent(HostComponent);

      expect(() => {
        fixture.detectChanges();
      }).toThrow();
    });
  });
});
