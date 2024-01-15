import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  public async createGroup(userId: string, name: string) {
    return this.prisma.group.create({
      data: { name, createdByUsedId: userId },
    });
  }

  public async inviteUser(groupId: string, userIds: string[]) {
    return this.prisma.group.update({
      where: { id: groupId },
      data: {
        invitedUsers: {
          connect: userIds.map((id) => ({
            id,
          })),
        },
      },
    });
  }

  public async removeUser(groupId: string, userIds: string[]) {
    return this.prisma.group.update({
      where: { id: groupId },
      data: {
        invitedUsers: {
          disconnect: userIds.map((id) => ({ id })),
        },
      },
    });
  }

  public async getGroupsByUser(userId: string) {
    return this.prisma.group.findMany({
      where: {
        OR: [{ createdByUsedId: userId }, { users: { some: { id: userId } } }],
      },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async getGroupSaldos(groupId: string) {
    const saldos = await this.prisma.saldo.findMany({
      where: { groupId },
      include: { user: { select: { name: true } } },
    });

    return saldos;
  }

  public async deleteGroup(userId: string, groupId: string) {
    return this.prisma.group.delete({
      where: { id: groupId, createdByUsedId: userId },
    });
  }

  public async acceptInvitation(userId: string, groupId: string) {
    await this.prisma.group.update({
      where: { id: groupId, invitedUsers: { some: { id: userId } } },
      data: {
        invitedUsers: { disconnect: { id: userId } },
        users: { connect: [{ id: userId }] },
      },
    });
  }
}
