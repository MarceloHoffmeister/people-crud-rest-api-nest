import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { mockRepository } from '../mocks/repositoryMockFactory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { HttpStatus } from '@nestjs/common/enums';

describe('UserService', () => {
  let sut: UserService;

  const userData: UserDto = {
    username: 'Marcelo Hoffmeister',
    email: 'marcelo@mail.com',
    password: '123456',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    sut = module.get<UserService>(UserService);
  });

  it('should return a user data', async () => {
    expect(await sut.create(userData)).toMatchObject({
      username: userData.username,
      email: userData.email,
    });
  });

  it('should return a collection of users entity', async () => {
    expect(await sut.findAll()).toEqual(<UserEntity[]>[{}]);
  });

  it('should return a searched user', async () => {
    const resp = await sut.create(userData);

    expect(await sut.findOne(resp.id)).toMatchObject({
      id: 1,
      username: userData.username,
      email: userData.email,
    });
  });

  it('should return a updated user', async () => {
    const newUserData: UserDto = {
      username: 'Marcelo Henrique Hoffmeister',
      email: 'marcelo_new_email@mail.com',
      password: '123456789',
    };

    const resp = await sut.create(userData);

    expect(await sut.update(resp.id, newUserData)).toMatchObject({
      username: newUserData.username,
      email: newUserData.email,
    });
  });

  it('should delete a user', async () => {
    const resp = await sut.create(userData);

    expect(await sut.remove(resp.id)).toMatchObject({
      status: HttpStatus.OK,
    });
  });

  it('should return a searched user by email', async () => {
    const resp = await sut.create(userData);

    expect(await sut.findByEmail(resp.email)).toMatchObject([
      {
        id: 1,
        username: userData.username,
        email: userData.email,
      },
    ]);
  });
});
