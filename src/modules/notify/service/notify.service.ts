import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class NotifyService {
  constructor(private readonly prisma: PrismaService) {}

  public async getGroupInvitationNotifications(userId: string) {
    return this.prisma.group.findMany({
      where: { invitedUsers: { some: { id: userId } } },
      include: { createdBy: { select: { name: true } } },
    });
  }

  public async getUnacceptedPaymentNotifications(userId: string) {
    return this.prisma.payment.findMany({
      where: { unacceptedUsers: { some: { id: userId } } },
    });
  }
}
