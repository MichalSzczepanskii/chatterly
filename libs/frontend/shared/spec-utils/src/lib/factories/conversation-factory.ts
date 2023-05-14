import { Conversation } from '@chatterly/shared/data-access';
import { faker } from '@faker-js/faker';
import { MessageFactory } from './message-factory';
import { UserFactory } from './user-factory';

export class ConversationFactory {
  static create(data: Partial<Conversation>): Conversation {
    return {
      id: data?.id ?? faker.datatype.number(),
      name: data?.name ?? faker.word.noun(),
      users: data?.users ?? UserFactory.createMany(2),
      messages:
        data?.messages ??
        MessageFactory.createMany(faker.datatype.number({ min: 1, max: 10 })),
    };
  }

  static createMany(count: number): Conversation[] {
    return Array.from({ length: count }, (el, index) =>
      ConversationFactory.create({ id: index })
    );
  }
}
