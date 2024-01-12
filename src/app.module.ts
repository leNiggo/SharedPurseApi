import { Module } from '@nestjs/common';
import PrismaModule from './prisma/prisma.module';
import UserModule from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './modules/auth/constants';
import AuthModule from './modules/auth/auth.module';
import GroupModule from './modules/group/group.module';
import PaymentModule from './modules/payment/payment.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
