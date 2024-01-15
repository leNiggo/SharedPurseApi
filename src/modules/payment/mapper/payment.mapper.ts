import { Decimal } from '@prisma/client/runtime/library';
import PaymentDTO from '../dto/payment.dto';
import { EURO } from 'src/currency/euro';

export function mapToPaymentDTO(
  payment: {
    id: string;
    name: string;
    amount: Decimal;
    createdAt: Date;
    location: string;
    createdById: string;
    groupId: string;
  } & {
    unacceptedUsers: {
      id: string;
    }[];
  },
): PaymentDTO {
  return {
    id: payment.id,
    amount: EURO(payment.amount.toNumber()).format(),
    createdAt: payment.createdAt,
    location: payment.location,
    name: payment.name,
    unacceptedUser: payment.unacceptedUsers?.map((id) => id.id),
  };
}
