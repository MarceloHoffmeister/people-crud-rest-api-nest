import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { mockService } from '../mocks/serviceMockFactory';
import { UserEntity } from './user.entity';

describe('UserController', () => {
  let sut: UserController;
  const userData: CreateUserDto = {
    username: 'Marcelo Hoffmeister',
    email: 'marcelo@mail.com',
    password: '123456',
  };

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

  it('should return username adn email of user', async () => {
    expect(await sut.create(userData)).toMatchObject({
      id: 1,
      username: userData.username,
      email: userData.email,
    });
  });

  it('should return a collection of users entity', async () => {
    expect(await sut.findAll()).toEqual(<UserEntity[]>[{}]);
  });

  it('should return a searched user', async () => {
    const resp = await sut.create(userData);

    expect(await sut.findOne(resp.id.toString())).toMatchObject({
      id: 1,
      username: userData.username,
      email: userData.email,
    });
  });
});
