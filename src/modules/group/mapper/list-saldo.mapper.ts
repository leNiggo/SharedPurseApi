import { Decimal } from '@prisma/client/runtime/library';
import GroupSaldoDTO from '../dto/group-saldo.dto';
import { EURO } from 'src/currency/euro';

export function mapToGroupSaldo(
  saldo: {
    user: {
      name: string;
    };
  } & {
    id: string;
    saldo: Decimal;
    userId: string;
    groupId: string;
  },
): GroupSaldoDTO {
  return {
    id: saldo.id,
    saldo: EURO(saldo.saldo.toNumber()).format(),
    userName: saldo.user.name,
  };
}
