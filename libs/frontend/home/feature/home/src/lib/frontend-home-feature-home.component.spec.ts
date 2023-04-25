import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { FrontendHomeFeatureHomeComponent } from './frontend-home-feature-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { User } from '@chatterly/api/users/data-access';
import {
  loadUsersSearch,
  selectUserSearchLoading,
  selectUserSearchUsers,
} from '@chatterly/frontend/home/data-access';
import { By } from '@angular/platform-browser';
import { UserFactory } from '@chatterly/frontend/shared/spec-utils';
import { LoaderComponent } from '@chatterly/frontend/shared/ui/loader';

describe('FrontendHomeFeatureHomeComponent', () => {
  let component: FrontendHomeFeatureHomeComponent;
  let fixture: ComponentFixture<FrontendHomeFeatureHomeComponent>;
  let store: MockStore<{ users: User[]; loading: boolean }>;
  const initialState = { users: [], loading: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontendHomeFeatureHomeComponent],
      imports: [ReactiveFormsModule, LoaderComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(FrontendHomeFeatureHomeComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUserSearch action after 400ms of typing a keyword', fakeAsync(() => {
    jest.spyOn(store, 'dispatch');
    const keyword = 'test';
    fixture.detectChanges();
    component.searchForm.patchValue({ keyword });
    tick(400);
    discardPeriodicTasks();
    expect(store.dispatch).toHaveBeenCalledWith(
      loadUsersSearch({ name: keyword })
    );
  }));

  it('should not dispatch loadUserSearch action before 400ms of typing a keyword', fakeAsync(() => {
    jest.spyOn(store, 'dispatch');
    const keyword = 'test';
    fixture.detectChanges();
    component.searchForm.patchValue({ keyword });
    tick(300);
    discardPeriodicTasks();
    expect(store.dispatch).not.toHaveBeenCalledWith(
      loadUsersSearch({ name: keyword })
    );
  }));

  it('should not dispatch loadUserSearch if keyword does not changed', fakeAsync(() => {
    const keyword = 'test';
    fixture.detectChanges();
    component.searchForm.patchValue({ keyword });
    tick(400);
    jest.spyOn(store, 'dispatch');
    component.searchForm.patchValue({ keyword });
    tick(400);
    discardPeriodicTasks();
    expect(store.dispatch).not.toHaveBeenCalledWith(
      loadUsersSearch({ name: keyword })
    );
  }));

  it('should not dispatch loadUserSearch if keyword was removed', fakeAsync(() => {
    fixture.detectChanges();
    component.searchForm.patchValue({ keyword: 'test' });
    tick(400);
    jest.spyOn(store, 'dispatch');
    component.searchForm.patchValue({ keyword: '' });
    tick(400);
    discardPeriodicTasks();
    expect(store.dispatch).not.toHaveBeenCalledWith(
      loadUsersSearch({ name: '' })
    );
  }));

  it('should display loader when loading is true', () => {
    store.overrideSelector(selectUserSearchLoading, true);
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.directive(LoaderComponent));
    const contacts = fixture.debugElement.queryAll(By.css('chatterly-contact'));
    expect(loader).toBeTruthy();
    expect(contacts.length).toEqual(0);
  });

  it('should display searched users', () => {
    const mockUsers = UserFactory.createMany(5);
    store.overrideSelector(selectUserSearchLoading, false);
    store.overrideSelector(selectUserSearchUsers, mockUsers);
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.directive(LoaderComponent));
    const contacts = fixture.debugElement.queryAll(By.css('chatterly-contact'));
    expect(loader).toBeFalsy();
    expect(contacts.length).toEqual(5);
    contacts.forEach(contact => {
      const username = contact.query(By.css('.name')).nativeElement.textContent;
      expect(mockUsers).toContain(username);
    });
  });
});
