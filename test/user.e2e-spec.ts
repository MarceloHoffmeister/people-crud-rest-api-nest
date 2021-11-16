import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDto } from '../src/user/dto/user.dto';
import { UserModule } from '../src/user/user.module';
import { Connection, getConnection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../src/auth/auth.module';
import { UserEntity } from '../src/user/user.entity';
import * as bcrypt from 'bcrypt';

describe('User domain (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let token: string;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
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
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  /*beforeEach(async () => {
    for (const entity of getConnection().entityMetadatas) {
      await getConnection().getRepository(entity.name).clear();
    }
  });*/

  beforeEach(async () => {
    await app
      .get(Connection)
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        username: 'Marcelo Hoffmeister',
        email: 'marcelo@mail.com',
        password: await bcrypt.hash('123456', await bcrypt.genSalt()),
      })
      .execute();
  });

  afterEach(async () => {
    for (const entity of getConnection().entityMetadatas) {
      await getConnection().getRepository(entity.name).clear();
    }

    await moduleFixture.close();
  });

  it('/auth/login (POST)', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login').send({
      email: 'marcelo@mail.com',
      password: '123456',
    });

    token = res.body.access_token;
  });

  it('/user (POST)', () => {
    const userData: UserDto = {
      username: 'Marcelo Henrique',
      email: 'marcelohenrique@mail.com',
      password: '123456',
    };

    return request(app.getHttpServer())
      .post('/user')
      .send(userData)
      .expect(201);
  });

  it('/user (GET ALL)', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/user/:id (GET BY ID)', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/user/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/user/1')
      .send({
        username: 'Marcelo Henrique',
        email: 'marcelohhoffmeister@mail.com',
        password: '123456789',
      })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('/user/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/user/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
