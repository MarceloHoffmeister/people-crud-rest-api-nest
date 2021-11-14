import { UserEntity } from '../user/user.entity';

export const mockService = jest.fn(() => ({
  create: jest.fn((entity: UserEntity) => entity),
  findAll: jest.fn(() => <UserEntity[]>[{}]),
}));
