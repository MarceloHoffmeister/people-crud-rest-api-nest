import { Test, TestingModule } from '@nestjs/testing';
import { PhoneController } from './phone.controller';
import { mockService } from '../mocks/serviceMockFactory';
import { PhoneService } from './phone.service';

describe('PhoneController', () => {
  let sut: PhoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneController],
      providers: [
        {
          provide: PhoneService,
          useFactory: mockService,
        },
      ],
    }).compile();

    sut = module.get<PhoneController>(PhoneController);
  });

  it('should save json data', () => {
    expect(
      sut.save({
        contacts: [
          { name: 'Marcelo Hoffmeister', cellphone: '5541996767913' },
          { name: 'Mayara Hoffmeister', cellphone: '5541996802345' },
        ],
      }),
    ).toBeDefined();
  });
});
