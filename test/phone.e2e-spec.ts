import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../src/user/user.module';
import { Connection, getConnection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../src/auth/auth.module';
import { UserEntity } from '../src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { PhoneDto } from '../src/phone/phone.dto';
import { PhoneModule } from '../src/phone/phone.module';

describe('Auth domain (e2e)', () => {
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
        PhoneModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    await app
      .get(Connection)
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        username: 'Marcelo Henrique Hoffmeister',
        email: 'marcelo@gmail.com',
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
      email: 'marcelo@gmail.com',
      password: '123456',
    });

    token = res.body.access_token;
  });

  it('/phone (POST)', () => {
    const phoneData: PhoneDto = {
      contacts: [
        {
          name: 'Marcelo Henrique',
          cellphone: '5541996767913',
        },
      ],
    };

    return request(app.getHttpServer())
      .post('/phone')
      .set('Authorization', `Bearer ${token}`)
      .send(phoneData)
      .expect(201);
  });
});
