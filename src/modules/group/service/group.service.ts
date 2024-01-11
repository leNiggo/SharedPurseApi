import { PrismaService } from 'src/prisma/prisma.service';

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

  public async getGroupsByUser(userId: string) {
    return this.prisma.group.findMany({
      where: { users: { some: { id: userId } } },
    });
  }

  public async deleteGroup(userId: string, groupId: string) {
    return this.prisma.group.delete({
      where: { id: groupId, createdByUsedId: userId },
    });
  }
}
