import { Module } from '@nestjs/common';
import PrismaModule from './prisma/prisma.module';
import UserModule from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './modules/auth/constants';
import AuthModule from './modules/auth/auth.module';
import GroupModule from './modules/group/group.module';
import PaymentModule from './modules/payment/payment.module';
import NotifyModule from './modules/notify/notify.module';

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
    PaymentModule,
    GroupModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
