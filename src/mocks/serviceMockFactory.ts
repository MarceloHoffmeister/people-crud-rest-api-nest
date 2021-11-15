import { UserEntity } from '../user/user.entity';

export const mockService = jest.fn(() => ({
  create: jest.fn(async (entity: UserEntity) => {
    return { id: 1, username: entity.username, email: entity.email };
  }),
  findAll: jest.fn(async () => <UserEntity[]>[{}]),
  findOne: jest.fn(async (id: string) => {
    return {
      id: 1,
      username: 'Marcelo Hoffmeister',
      email: 'marcelo@mail.com',
    };
  }),
}));
