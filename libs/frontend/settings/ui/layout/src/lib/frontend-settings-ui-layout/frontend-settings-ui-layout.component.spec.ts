import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSettingsUiLayoutComponent } from './frontend-settings-ui-layout.component';

describe('FrontendSettingsUiLayoutComponent', () => {
  let component: FrontendSettingsUiLayoutComponent;
  let fixture: ComponentFixture<FrontendSettingsUiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendSettingsUiLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendSettingsUiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
