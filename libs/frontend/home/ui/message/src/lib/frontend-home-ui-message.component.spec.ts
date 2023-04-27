import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendHomeUiMessageComponent } from './frontend-home-ui-message.component';

describe('FrontendHomeUiMessageComponent', () => {
  let component: FrontendHomeUiMessageComponent;
  let fixture: ComponentFixture<FrontendHomeUiMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendHomeUiMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendHomeUiMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
