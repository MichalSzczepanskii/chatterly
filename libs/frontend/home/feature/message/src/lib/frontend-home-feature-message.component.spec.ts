import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendHomeFeatureMessageComponent } from './frontend-home-feature-message.component';

describe('FrontendHomeFeatureMessageComponent', () => {
  let component: FrontendHomeFeatureMessageComponent;
  let fixture: ComponentFixture<FrontendHomeFeatureMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendHomeFeatureMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendHomeFeatureMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
