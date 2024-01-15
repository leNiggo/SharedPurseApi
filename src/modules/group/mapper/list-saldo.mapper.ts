import { Decimal } from '@prisma/client/runtime/library';
import GroupSaldoDTO from '../dto/group-saldo.dto';

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
    saldo: saldo.saldo.toString(),
    userName: saldo.user.name,
  };
}
