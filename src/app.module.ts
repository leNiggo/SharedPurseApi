import { Module } from '@nestjs/common';
import PrismaModule from './prisma/prisma.module';
import UserModule from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './modules/auth/constants';
import AuthModule from './modules/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5 days' },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
