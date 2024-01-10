import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async singIn(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, password },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, userName: user.name };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
