import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreatePaymentDTO from '../dto/create-payment.dto';
import UpdatePaymentDTO from '../dto/update-payment.dto';
import { EURO } from 'src/currency/euro';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export default class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  public async createPayment(userId: string, fields: CreatePaymentDTO) {
    const group = await this.prisma.group.findFirstOrThrow({
      where: { id: fields.groupId },
      select: { users: true, invitedUsers: true },
    });

    const userIds = [...group.users, ...group.invitedUsers];

    return this.prisma.payment.create({
      data: {
        amount: fields.amount,
        location: fields.location,
        name: fields.name,
        createdById: userId,
        groupId: fields.groupId,
        unacceptedUsers: {
          connect: userIds.map((user) => ({ id: user.id })),
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

  public async acceptPayment(userId: string, paymentId: string) {
    const payment = await this.prisma.payment.findUniqueOrThrow({
      where: { id: paymentId },
    });

    const userCount = await this.prisma.user.count({
      where: {
        OR: [
          { groups: { some: { id: payment.groupId } } },
          { createdGroups: { some: { id: payment.groupId } } },
        ],
      },
    });

    if (userCount < 1) {
      return;
    }

    await this.prisma.saldo.upsert({
      where: { userId_groupId: { groupId: payment.groupId, userId } },
      update: {
        saldo: {
          decrement: new Decimal(
            EURO(payment.amount.toNumber()).divide(userCount).value,
          ),
        },
      },
      create: {
        userId,
        groupId: payment.groupId,
        saldo: new Decimal(
          EURO(payment.amount.toNumber()).divide(userCount).value,
        ),
      },
    });

    await this.prisma.saldo.upsert({
      where: {
        userId_groupId: {
          groupId: payment.groupId,
          userId: payment.createdById,
        },
      },
      update: {
        saldo: {
          increment: new Decimal(
            EURO(payment.amount.toNumber()).subtract(
              EURO(payment.amount.toNumber()).divide(userCount),
            ).value,
          ),
        },
      },
      create: {
        userId: payment.createdById,
        groupId: payment.groupId,
        saldo: new Decimal(
          EURO(payment.amount.toNumber()).subtract(
            EURO(payment.amount.toNumber()).divide(userCount),
          ).value,
        ),
      },
    });

    await this.prisma.payment.update({
      where: { id: paymentId, unacceptedUsers: { some: { id: userId } } },
      data: {
        unacceptedUsers: { disconnect: { id: userId } },
      },
    });
  }
}
