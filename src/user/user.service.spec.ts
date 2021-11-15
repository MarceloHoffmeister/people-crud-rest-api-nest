import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { mockRepository } from '../mocks/repositoryMockFactory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let sut: UserService;
  const userData: CreateUserDto = {
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
});
