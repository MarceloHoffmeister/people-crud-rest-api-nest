import { Module } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';

@Module({
  controllers: [PhoneController],
  providers: [PhoneService]
})
export class PhoneModule {}
