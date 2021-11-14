import { UserEntity } from '../user/user.entity';

export const mockRepository = jest.fn(() => ({
  save: jest.fn((entity: UserEntity) => entity),
  find: jest.fn(() => <UserEntity[]>[{}]),
}));
