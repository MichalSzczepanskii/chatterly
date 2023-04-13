import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockModule } from 'ng-mocks';
import {
  FrontendSharedDataAccessModule,
  userDataRefresh,
} from '@chatterly/frontend/shared/data-access';
import { FrontendSidebarComponent } from '@chatterly/frontend/sidebar/feature/sidebar';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainLayoutComponent,
        RouterTestingModule,
        MockModule(FrontendSharedDataAccessModule),
      ],
      declarations: [MockComponent(FrontendSidebarComponent)],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch usersDataRefresh on init', () => {
    const spy = jest.spyOn(Store.prototype, 'dispatch');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(userDataRefresh());
  });
});
