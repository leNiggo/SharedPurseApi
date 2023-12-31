import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateUserDTO from '../dto/create-user.dto';
import UpdateUserDTO from '../dto/update-user.dto';

@Injectable()
export default class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async getList() {
    return this.prisma.user.findMany();
  }

  public async getUser(id: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  public async createUser(user: CreateUserDTO) {
    return this.prisma.user.create({ data: user });
  }

  public async update(userId: string, user: UpdateUserDTO) {
    await this.prisma.user.update({ where: { id: userId }, data: user });
  }

  public async delete(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
