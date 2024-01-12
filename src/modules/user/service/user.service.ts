import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateUserDTO from '../dto/create-user.dto';
import UpdateUserDTO from '../dto/update-user.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export default class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async getList() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
  }

  public async getUser(id: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: { id: true, email: true, name: true },
    });
  }

  public async createUser(user: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role || UserRole.CLIENT,
      },
    });
  }

  public async update(userId: string, user: UpdateUserDTO) {
    await this.prisma.user.update({ where: { id: userId }, data: user });
  }

  public async delete(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
