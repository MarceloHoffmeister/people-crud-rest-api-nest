import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneEntity } from './phone.entity';
import { PhoneDto } from './phone.dto';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
  ) {}

  async save(phonesData: PhoneDto[]) {
    for (const phone of phonesData) {
      await this.phoneRepository.save(phone);
    }
  }
}
