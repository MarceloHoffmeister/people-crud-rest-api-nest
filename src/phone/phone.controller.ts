import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneDto } from './phone.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async save(@Body() phonesData: PhoneDto) {
    return await this.phoneService.save(phonesData.contacts);
  }
}
