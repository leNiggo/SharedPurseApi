import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreatePaymentDTO from '../dto/create-payment.dto';
import UpdatePaymentDTO from '../dto/update-payment.dto';

@Injectable()
export default class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  public async createPayment(userId: string, fields: CreatePaymentDTO) {
    const userIdsInGroup = await this.prisma.group.findFirstOrThrow({
      where: { id: fields.groupId },
      select: { users: true },
    });

    return this.prisma.payment.create({
      data: {
        amount: fields.amount,
        location: fields.location,
        name: fields.name,
        createdById: userId,
        groupId: fields.groupId,
        unacceptedUsers: {
          connect: userIdsInGroup.users.map((user) => ({ id: user.id })),
        },
      },
    });
  }

  public async getPayment(paymentId: string) {
    return this.prisma.payment.findUniqueOrThrow({
      where: { id: paymentId },
      include: { unacceptedUsers: { select: { id: true } } },
    });
  }

  public async getPaymentByGroup(groupId: string) {
    return this.prisma.payment.findMany({ where: { groupId } });
  }

  public async updatePayment(
    paymentId: string,
    createdById: string,
    fields: UpdatePaymentDTO,
  ) {
    await this.prisma.payment.update({
      where: { id: paymentId, createdById },
      data: fields,
    });
  }

  public async deletePayment(paymentId: string) {
    return this.prisma.payment.delete({ where: { id: paymentId } });
  }
}
