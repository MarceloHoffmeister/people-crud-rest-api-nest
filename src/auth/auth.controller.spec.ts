import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { mockService } from '../mocks/serviceMockFactory';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let sut: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: mockService,
        },
      ],
    }).compile();

    sut = module.get<AuthController>(AuthController);
  });

  it('should be return a access token', async () => {
    expect(
      await sut.login({ user: { username: 'Marcelo Hoffmeister', userId: 1 } }),
    ).toMatchObject({ access_token: 'any_token' });
  });
});
