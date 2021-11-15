import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/dto/user.dto';
import { HttpStatus } from '@nestjs/common/enums';

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
  update: jest.fn(async (id: string, userData: UserDto) => {
    return {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };
  }),
  delete: jest.fn(async (id: string) => {
    return { status: HttpStatus.OK };
  }),
}));
