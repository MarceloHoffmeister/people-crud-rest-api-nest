import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { mockService } from '../mocks/serviceMockFactory';
import { UserEntity } from './user.entity';

describe('UserController', () => {
  let sut: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: mockService,
        },
      ],
    }).compile();

    sut = module.get<UserController>(UserController);
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
