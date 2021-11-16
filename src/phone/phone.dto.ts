import { IsArray, IsNotEmpty } from 'class-validator';

export class PhoneDto {
  @IsArray()
  @IsNotEmpty()
  readonly contacts;
}
