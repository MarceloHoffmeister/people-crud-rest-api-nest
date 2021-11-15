import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDto } from '../src/user/dto/user.dto';
import { UserModule } from '../src/user/user.module';
import { getConnection } from 'typeorm';
import { AuthModule } from '../dist/auth/auth.module';

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
          database: 'test',
          autoLoadEntities: true,
          synchronize: true,
        }),
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    for (const entity of getConnection().entityMetadatas) {
      await getConnection().getRepository(entity.name).clear();
    }
  });

  afterEach(async () => {
    await moduleFixture.close();
  });

  it('/user (POST)', () => {
    const userData: UserDto = {
      username: 'Marcelo Hoffmeister',
      email: 'marcelo@mail.com',
      password: '123456',
    };

    return request(app.getHttpServer())
      .post('/user')
      .send(userData)
      .expect(201);
  });

  it('/user (GET ALL)', () => {
    return request(app.getHttpServer()).get('/user/1').expect(200);
  });

  it('/user/:id (GET BY ID)', () => {
    return request(app.getHttpServer()).get('/user/1').expect(200);
  });

  it('/user/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/user/1')
      .send({
        username: 'Marcelo Henrique Hoffmeister',
        email: 'marcelohoffmeister@mail.com',
        password: '123456789',
      })
      .expect(200);
  });

  it('/user/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/user/1').expect(200);
  });
});
