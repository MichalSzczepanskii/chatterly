import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSettingsFeatureAccountComponent } from '@chatterly/frontend/settings/feature/account';
import { getTranslocoModule } from '@chatterly/frontend/shared/spec-utils';

describe('FrontendSettingsFeatureAccountComponent', () => {
  let component: FrontendSettingsFeatureAccountComponent;
  let fixture: ComponentFixture<FrontendSettingsFeatureAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendSettingsFeatureAccountComponent, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendSettingsFeatureAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
