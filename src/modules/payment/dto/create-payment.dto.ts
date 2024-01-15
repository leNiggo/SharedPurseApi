import { OmitType } from '@nestjs/swagger';
import PaymentDTO from './payment.dto';
import { IsUUID } from 'class-validator';

export default class CreatePaymentDTO extends OmitType(PaymentDTO, [
  'unacceptedUser',
  'id',
]) {
  @IsUUID()
  groupId: string;
}
