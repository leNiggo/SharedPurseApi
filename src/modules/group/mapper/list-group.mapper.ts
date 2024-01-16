import { Decimal } from '@prisma/client/runtime/library';
import GroupDTO from '../dto/group.dto';
import { EURO } from 'src/currency/euro';

export function mapToGroupListDTO(
  group: {
    createdBy: {
      name: string;
    };
  } & {
    id: string;
    name: string;
    createdByUsedId: string;
    Saldo: {
      id: string;
      saldo: Decimal;
      userId: string;
      groupId: string;
    }[];
  },
): GroupDTO {
  return {
    createdByUser: group.createdBy.name,
    name: group.name,
    id: group.id,
    userSaldo: group.Saldo.find((saldo) => saldo.userId === saldo.userId).saldo
      ? EURO(
          group.Saldo.find(
            (saldo) => saldo.userId === saldo.userId,
          ).saldo.toNumber(),
        ).format()
      : undefined,
  };
}
