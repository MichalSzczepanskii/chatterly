import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSettingsUiLayoutComponent } from './frontend-settings-ui-layout.component';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('FrontendSettingsUiLayoutComponent', () => {
  let component: FrontendSettingsUiLayoutComponent;
  let fixture: ComponentFixture<FrontendSettingsUiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FrontendSettingsUiLayoutComponent,
        StoreModule.forRoot({}),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendSettingsUiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
