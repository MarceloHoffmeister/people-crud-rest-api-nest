import { Body, Controller, Post } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneDto } from './phone.dto';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post()
  async save(@Body() phonesData: PhoneDto[]) {
    return await this.phoneService.save(phonesData);
  }
}
