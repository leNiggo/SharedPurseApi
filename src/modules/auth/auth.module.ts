import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import AuthService from './service/auth.service';
import AuthController from './controller/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import AuthGuard from './guards/auth.guard';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [AuthController],
})
export default class AuthModule {}
