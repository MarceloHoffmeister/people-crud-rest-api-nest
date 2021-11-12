import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('create', () => {
    it('should return a user dto', () => {
      const userData = {
        username: 'Marcelo Hoffmeister',
        email: 'marcelohenriquehoffmeister@gmail.com',
        password: '123456789',
      };

      expect(controller.create(<CreateUserDto>userData)).toEqual(userData);
    });
  });
});
