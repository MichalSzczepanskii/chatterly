import { Test } from '@nestjs/testing';
import { ApiConversationFeatureController } from './api-conversation-feature.controller';

describe('ApiConversationFeatureController', () => {
  let controller: ApiConversationFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiConversationFeatureController],
    }).compile();

    controller = module.get(ApiConversationFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
