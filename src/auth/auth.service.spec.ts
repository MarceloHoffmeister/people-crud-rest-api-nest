import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { mockService } from '../mocks/serviceMockFactory';

describe('AuthService', () => {
  let sut: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useFactory: mockService,
        },
        {
          provide: UserService,
          useFactory: mockService,
        },
      ],
    }).compile();

    sut = module.get<AuthService>(AuthService);
  });

  it('should return a valid user', async () => {
    expect(
      await sut.validateUser('marcelohoffmeister@mail.com', 'any_password'),
    ).toMatchObject({
      id: 1,
      username: 'Marcelo Hoffmeister',
      email: 'marcelo@mail.com',
    });
  });
});
