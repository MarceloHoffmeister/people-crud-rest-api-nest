import { IsNotEmpty } from 'class-validator';

export class PhoneDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly cellphone: string;
}
