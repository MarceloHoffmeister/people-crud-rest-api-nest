import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UserModule } from '../src/user/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '172.17.0.1',
          port: 25432,
          username: 'admin',
          password: 'admin',
          database: 'varejao',
          autoLoadEntities: true,
          synchronize: true,
        }),
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await moduleFixture.close();
  });

  it('/user (POST)', () => {
    const userData: CreateUserDto = {
      username: 'Marcelo Hoffmeister',
      email: 'marcelo@mail.com',
      password: '123456',
    };

    return request(app.getHttpServer())
      .post('/user')
      .send(userData)
      .expect(201);
  });
});
