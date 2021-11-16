import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { mockService } from '../mocks/serviceMockFactory';
import { UserEntity } from './user.entity';
import { HttpStatus } from '@nestjs/common/enums';

describe('UserController', () => {
  let sut: UserController;
  const userData: UserDto = {
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

  it('should return a updated user', async () => {
    const newUserData: UserDto = {
      username: 'Marcelo Henrique Hoffmeister',
      email: 'marcelo_new_email@mail.com',
      password: '123456789',
    };

    const resp = await sut.create(userData);

    expect(await sut.update(resp.id.toString(), newUserData)).toMatchObject({
      id: resp.id.toString(),
      username: newUserData.username,
      email: newUserData.email,
    });
  });

  it('should delete a user', async () => {
    const resp = await sut.create(userData);

    expect(await sut.remove(resp.id.toString())).toMatchObject({
      status: HttpStatus.OK,
    });
  });
});
