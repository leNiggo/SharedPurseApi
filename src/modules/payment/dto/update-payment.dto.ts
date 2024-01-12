import { OmitType, PartialType } from '@nestjs/swagger';
import CreatePaymentDTO from './create-payment.dto';

export default class UpdatePaymentDTO extends PartialType(
  OmitType(CreatePaymentDTO, ['createdAt', 'groupId']),
) {}
