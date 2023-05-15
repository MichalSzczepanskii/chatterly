import { TestBed } from '@angular/core/testing';

import { ConversationService } from './conversation.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Conversation } from '@chatterly/shared/data-access';
import { ConversationFactory } from '@chatterly/frontend/shared/spec-utils';

describe('ConversationService', () => {
  const apiUrl = process.env['NX_API_URL'];
  let service: ConversationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ConversationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPrivateConversation', () => {
    it('should make a get request', () => {
      const testData: Conversation = { id: 0, messages: [], users: [] };
      const userId = 0;
      service
        .getPrivateConversation(userId)
        .subscribe(result => expect(result).toEqual(testData));

      const req = httpTestingController.expectOne(
        `${apiUrl}/api/conversations/user/${userId}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
      httpTestingController.verify();
    });
  });

  describe('#getConversations', () => {
    it('should make a get request', () => {
      const testData = ConversationFactory.createMany(5);
      service
        .getConversations()
        .subscribe(result => expect(result).toEqual(testData));

      const req = httpTestingController.expectOne(
        `${apiUrl}/api/conversations`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
      httpTestingController.verify();
    });
  });
});
