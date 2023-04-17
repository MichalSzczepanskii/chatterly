import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendHomeFeatureHomeComponent } from './frontend-home-feature-home.component';

describe('FrontendHomeFeatureHomeComponent', () => {
  let component: FrontendHomeFeatureHomeComponent;
  let fixture: ComponentFixture<FrontendHomeFeatureHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontendHomeFeatureHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendHomeFeatureHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
