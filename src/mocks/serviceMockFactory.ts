import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/dto/user.dto';

export const mockService = jest.fn(() => ({
  create: jest.fn(async (entity: UserDto) => {
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
  update: jest.fn(async (id: string, userData: UserDto) => {
    return {
      id: id.toString(),
      username: userData.username,
      email: userData.email,
    };
  }),
}));
