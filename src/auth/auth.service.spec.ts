import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { mockService } from '../mocks/serviceMockFactory';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let sut: AuthService;
  let bcryptCompare: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useFactory: mockService,
        },
        {
          provide: JwtService,
          useFactory: mockService,
        },
      ],
    }).compile();

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    bcryptCompare.mockReturnValue(true);

    sut = module.get<AuthService>(AuthService);
  });

  it('should return a valid user', async () => {
    expect(
      await sut.validateUser('marcelo@mail.com', 'any_password'),
    ).toMatchObject({
      id: 1,
      username: 'Marcelo Hoffmeister',
      email: 'marcelo@mail.com',
    });
  });

  it('should return a null on authentication', async () => {
    bcryptCompare.mockReturnValue(false);

    expect(
      await sut.validateUser('marcelo@mail.com', 'any_password'),
    ).toBeNull();
  });

  it('should be return a access token', async () => {
    expect(
      await sut.login({ username: 'Marcelo Hoffmeister', userId: 1 }),
    ).toMatchObject({ access_token: 'any_token' });
  });
});
