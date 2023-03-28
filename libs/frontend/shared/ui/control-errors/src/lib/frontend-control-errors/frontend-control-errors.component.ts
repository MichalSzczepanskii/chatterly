import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlContainer,
  ValidationErrors,
} from '@angular/forms';
import { findFormControl } from './find-form-control';
import { startWith, Subscription } from 'rxjs';

interface TemplateContext {
  $implicit: ValidationErrors;
}

@Component({
  selector: 'chatterly-frontend-control-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frontend-control-errors.component.html',
  styleUrls: ['./frontend-control-errors.component.scss'],
})
export class FrontendControlErrorsComponent implements OnInit, OnDestroy {
  @Input()
  public controlName!: string;
  public internalControl?: AbstractControl;
  public subscription?: Subscription;
  @ContentChild(TemplateRef)
  public template: TemplateRef<TemplateContext> | null = null;
  public templateContext: TemplateContext = {
    $implicit: {},
  };

  constructor(@Optional() private controlContainer?: ControlContainer) {}

  ngOnInit(): void {
    this.internalControl = findFormControl(
      this.controlName,
      this.controlContainer
    );
    this.subscription = this.internalControl.statusChanges
      .pipe(startWith('PENDING'))
      .subscribe(() => {
        this.updateTemplateContext();
      });
  }

  private updateTemplateContext(): void {
    if (this.internalControl && this.internalControl.errors) {
      this.templateContext = {
        $implicit: this.internalControl.errors,
      };
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
