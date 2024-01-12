import { Type } from 'class-transformer';
import { IsCurrency, IsDate, IsString, IsUUID } from 'class-validator';

export default class PaymentDTO {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;

  @IsCurrency()
  amount!: string;

  @IsString()
  location!: string;

  @IsDate()
  @Type(() => Date)
  createdAt!: Date;

  @IsUUID('4', { each: true })
  unacceptedUser: string[];
}
