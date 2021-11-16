import { Module } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneEntity } from './phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity])],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
