import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/dto/user.dto';
import { HttpStatus } from '@nestjs/common/enums';

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
  remove: jest.fn(async (id: string) => {
    return { status: HttpStatus.OK };
  }),
  findByEmail: jest.fn(async (email: string) => {
    if (email === 'marcelo@mail.com')
      return [
        {
          id: 1,
          username: 'Marcelo Hoffmeister',
          email: 'marcelo@mail.com',
          password: 'any_password',
        },
      ];
  }),
  validateUser: jest.fn(async (email: string, password: string) => {
    if (password === 'any_password') {
      return {
        id: 1,
        username: 'Marcelo Hoffmeister',
        email: 'marcelo@mail.com',
      };
    }

    return null;
  }),
}));
