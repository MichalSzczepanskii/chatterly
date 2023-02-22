import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSidebarComponent } from './frontend-sidebar.component';

describe('FrontendShellUiSidebarComponent', () => {
  let component: FrontendSidebarComponent;
  let fixture: ComponentFixture<FrontendSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
