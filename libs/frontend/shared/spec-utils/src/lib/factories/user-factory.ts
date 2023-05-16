import { User } from '@chatterly/shared/data-access';
import { faker } from '@faker-js/faker';

export class UserFactory {
  static create(user?: Partial<User>): User {
    return {
      id: user?.id ?? faker.datatype.number(),
      email: user?.email ?? faker.internet.email(),
      name: user?.name ?? faker.name.fullName(),
      isActive: user?.isActive ?? true,
    };
  }

  static createMany(count: number): User[] {
    const users = [];
    for (let i = 1; i <= count; i++) {
      users.push(UserFactory.create({ id: i }));
    }
    return users;
  }
}
