import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendSidebarComponent } from './frontend-sidebar.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FrontendShellUiSidebarComponent', () => {
  let component: FrontendSidebarComponent;
  let fixture: ComponentFixture<FrontendSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendSidebarComponent, RouterTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
