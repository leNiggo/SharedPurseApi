import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import NotificationController from './controller/notify.controller';
import NotifyService from './service/notify.service';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationController],
  providers: [NotifyService],
})
export default class NotifyModule {}
