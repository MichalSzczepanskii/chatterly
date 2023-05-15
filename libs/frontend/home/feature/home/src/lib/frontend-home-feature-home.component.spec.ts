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
import {
  ContactState,
  FrontendHomeDataAccessModule,
  loadContacts,
  loadUsersSearch,
  selectContacts,
  selectContactsLoading,
  selectUserSearchLoading,
  selectUserSearchUsers,
  UserSearchState,
} from '@chatterly/frontend/home/data-access';
import { By } from '@angular/platform-browser';
import {
  ConversationFactory,
  MessageFactory,
  UserFactory,
} from '@chatterly/frontend/shared/spec-utils';
import { LoaderComponent } from '@chatterly/frontend/shared/ui/loader';
import { ContactComponent } from '@chatterly/frontend/home/ui/contact';
import { MockComponent, MockModule } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthState, selectUser } from '@chatterly/frontend/shared/data-access';
import * as dayjs from 'dayjs';

describe('FrontendHomeFeatureHomeComponent', () => {
  let component: FrontendHomeFeatureHomeComponent;
  let fixture: ComponentFixture<FrontendHomeFeatureHomeComponent>;
  let userSearchStore: MockStore<UserSearchState>;
  let contactStore: MockStore<ContactState>;
  let authStore: MockStore<AuthState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrontendHomeFeatureHomeComponent],
      imports: [
        ReactiveFormsModule,
        MockComponent(LoaderComponent),
        MockComponent(ContactComponent),
        MockModule(FrontendHomeDataAccessModule),
        RouterTestingModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    userSearchStore = TestBed.inject(MockStore<UserSearchState>);
    contactStore = TestBed.inject(MockStore<ContactState>);
    authStore = TestBed.inject(MockStore<AuthState>);

    fixture = TestBed.createComponent(FrontendHomeFeatureHomeComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterEach(() => {
    userSearchStore.resetSelectors();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUserSearch action after 400ms of typing a keyword', fakeAsync(() => {
    jest.spyOn(userSearchStore, 'dispatch');
    const keyword = 'test';
    fixture.detectChanges();
    component.searchForm.patchValue({ keyword });
    tick(400);
    discardPeriodicTasks();
    expect(userSearchStore.dispatch).toHaveBeenCalledWith(
      loadUsersSearch({ name: keyword })
    );
  }));

  it('should not dispatch loadUserSearch action before 400ms of typing a keyword', fakeAsync(() => {
    jest.spyOn(userSearchStore, 'dispatch');
    const keyword = 'test';
    fixture.detectChanges();
    component.searchForm.patchValue({ keyword });
    tick(300);
    discardPeriodicTasks();
    expect(userSearchStore.dispatch).not.toHaveBeenCalledWith(
      loadUsersSearch({ name: keyword })
    );
  }));

  it('should not dispatch loadUserSearch if keyword does not changed', fakeAsync(() => {
    const keyword = 'test';
    fixture.detectChanges();
    component.searchForm.patchValue({ keyword });
    tick(400);
    jest.spyOn(userSearchStore, 'dispatch');
    component.searchForm.patchValue({ keyword });
    tick(400);
    discardPeriodicTasks();
    expect(userSearchStore.dispatch).not.toHaveBeenCalledWith(
      loadUsersSearch({ name: keyword })
    );
  }));

  it('should not dispatch loadUserSearch if keyword was removed', fakeAsync(() => {
    fixture.detectChanges();
    component.searchForm.patchValue({ keyword: 'test' });
    tick(400);
    jest.spyOn(userSearchStore, 'dispatch');
    component.searchForm.patchValue({ keyword: '' });
    tick(400);
    discardPeriodicTasks();
    expect(userSearchStore.dispatch).not.toHaveBeenCalledWith(
      loadUsersSearch({ name: '' })
    );
  }));

  it('should display loader when loading is true', () => {
    contactStore.overrideSelector(selectContactsLoading, false);
    userSearchStore.overrideSelector(selectUserSearchLoading, true);
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.directive(LoaderComponent));
    const contacts = fixture.debugElement.queryAll(By.css('chatterly-contact'));
    expect(loader).toBeTruthy();
    expect(contacts.length).toEqual(0);
  });

  it('should display searched users', () => {
    const mockUsers = UserFactory.createMany(5);
    contactStore.overrideSelector(selectContactsLoading, false);
    userSearchStore.overrideSelector(selectUserSearchLoading, false);
    userSearchStore.overrideSelector(selectUserSearchUsers, mockUsers);
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.directive(LoaderComponent));
    const contacts = fixture.debugElement.queryAll(
      By.directive(ContactComponent)
    );
    expect(loader).toBeFalsy();
    expect(contacts.length).toEqual(5);
    contacts.forEach(contact => {
      const user = contact.componentInstance.user;
      expect(mockUsers).toContain(user);
    });
  });

  it('should dispatch loadContacts on init', () => {
    jest.spyOn(contactStore, 'dispatch');
    fixture.detectChanges();
    expect(contactStore.dispatch).toHaveBeenCalledWith(loadContacts());
  });

  it('should display loader on contactList when loading on contactState is true', () => {
    userSearchStore.overrideSelector(selectUserSearchLoading, false);
    contactStore.overrideSelector(selectContactsLoading, true);
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.directive(LoaderComponent));
    expect(loader).toBeTruthy();
  });

  it('should display contacts when loaded', () => {
    const sortedDates = [
      '2023-05-15 11:00',
      '2023-05-14 11:00',
      '2023-05-13 11:00',
      '2023-05-12 11:00',
      '2023-05-12 10:00',
    ];
    const conversations = sortedDates.map(el =>
      ConversationFactory.create({
        messages: [MessageFactory.create({ createdAt: dayjs(el).toDate() })],
      })
    );
    userSearchStore.overrideSelector(selectUserSearchLoading, false);
    contactStore.overrideSelector(selectContactsLoading, false);
    contactStore.overrideSelector(selectContacts, conversations);
    authStore.overrideSelector(selectUser, UserFactory.create());
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.directive(LoaderComponent));
    const contacts = fixture.debugElement.queryAll(
      By.directive(ContactComponent)
    );
    expect(loader).toBeFalsy();
    expect(contacts.length).toEqual(sortedDates.length);
    contacts.forEach((contact, index) => {
      const user = contact.componentInstance.user;
      const message = contact.componentInstance.lastMessage;
      expect(conversations[index].users).toContain(user);
      expect(conversations[index].messages).toContain(message);
    });
  });

  it('should filter out current user from contact users', done => {
    const contactsCount = 5;
    const loggedUser = UserFactory.create();
    const conversations = Array.from({ length: contactsCount }, (el, index) =>
      ConversationFactory.create({
        id: index,
        users: [loggedUser, UserFactory.create()],
      })
    );
    contactStore.overrideSelector(selectContacts, conversations);
    authStore.overrideSelector(selectUser, loggedUser);
    fixture.detectChanges();
    component.contacts$.subscribe(contacts => {
      for (const contact of contacts) {
        expect(contact.users).not.toContain(loggedUser);
      }
      done();
    });
  });

  it('should sort contacts by last message createdAt field', done => {
    const dates = [
      '2023-05-13 11:00',
      '2023-05-14 11:00',
      '2023-05-15 11:00',
      '2023-05-12 10:00',
      '2023-05-12 11:00',
    ];
    const sortedDates = [
      '2023-05-15 11:00',
      '2023-05-14 11:00',
      '2023-05-13 11:00',
      '2023-05-12 11:00',
      '2023-05-12 10:00',
    ];
    const conversations = dates.map(el =>
      ConversationFactory.create({
        messages: [MessageFactory.create({ createdAt: dayjs(el).toDate() })],
      })
    );
    contactStore.overrideSelector(selectContacts, conversations);
    authStore.overrideSelector(selectUser, UserFactory.create());
    fixture.detectChanges();
    component.contacts$.subscribe(contacts => {
      contacts.forEach((contact, index) => {
        expect(contact.messages[0].createdAt).toEqual(
          dayjs(sortedDates[index]).toDate()
        );
      });
      done();
    });
  });
});
