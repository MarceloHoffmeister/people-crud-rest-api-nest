import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { mockRepository } from '../mocks/repositoryMockFactory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let sut: UserService;

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

  it('should return a user dto', async () => {
    const userData: CreateUserDto = {
      username: 'Marcelo Hoffmeister',
      email: 'marcelo@mail.com',
      password: '123456',
    };

    expect(await sut.create(userData)).toHaveProperty('email', userData.email);

    const res = await sut.create(userData);
    expect(bcrypt.compare(res.password, userData.password)).toBeTruthy();
  });

  it('should return a collection of users entity', async () => {
    expect(await sut.findAll()).toEqual(<UserEntity[]>[{}]);
  });
});
