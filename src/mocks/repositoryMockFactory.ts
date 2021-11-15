import { UserEntity } from '../user/user.entity';

export const mockRepository = jest.fn(() => ({
  save: jest.fn((entity: UserEntity) => {
    return { id: 1, username: entity.username, email: entity.email };
  }),
  find: jest.fn(() => <UserEntity[]>[{}]),
  findOne: jest.fn(async (id: string) => {
    return {
      id: 1,
      username: 'Marcelo Hoffmeister',
      email: 'marcelo@mail.com',
    };
  }),
}));
