import { Test, TestingModule } from '@nestjs/testing';
import { PhoneService } from './phone.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../mocks/repositoryMockFactory';
import { PhoneEntity } from './phone.entity';

describe('PhoneService', () => {
  let sut: PhoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhoneService,
        {
          provide: getRepositoryToken(PhoneEntity),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    sut = module.get<PhoneService>(PhoneService);
  });

  it('should save json data', () => {
    expect(
      sut.save([
        { name: 'Marcelo Hoffmeister', cellphone: '5541996767913' },
        { name: 'Mayara Hoffmeister', cellphone: '5541996802345' },
      ]),
    ).toBeDefined();
  });
});
