import { Message } from '@chatterly/shared/data-access';
import { faker } from '@faker-js/faker';
import { UserFactory } from './user-factory';

export class MessageFactory {
  static create(message?: Partial<Message>): Message {
    return {
      id: message?.id ?? faker.datatype.number(),
      text: message?.text ?? faker.lorem.paragraph(),
      createdAt: message?.createdAt ?? faker.date.past(),
      author: message?.author ?? UserFactory.create(),
    };
  }

  static createMany(count: number) {
    const messages = [];
    for (let i = 1; i <= count; i++) {
      messages.push(MessageFactory.create());
    }
    return messages;
  }
}
