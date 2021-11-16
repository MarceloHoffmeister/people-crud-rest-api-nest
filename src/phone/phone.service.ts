import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneEntity } from './phone.entity';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
  ) {}

  async save(phonesData: []) {
    try {
      for (const phone of phonesData) {
        await this.phoneRepository.save(phone);
      }

      return HttpStatus.CREATED;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
