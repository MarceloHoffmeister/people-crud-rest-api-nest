import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { mockRepository } from '../mocks/repositoryMockFactory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

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

  it('should return a user dto', () => {
    const userData: CreateUserDto = {
      username: 'Marcelo Hoffmeister',
      email: 'marcelo@mail.com',
      password: '123456',
    };

    expect(sut.create(userData)).toMatchObject(<UserEntity>userData);
  });
});
