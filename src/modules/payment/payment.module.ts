import { Module } from '@nestjs/common';
import PaymentController from './controller/payment.controller';
import PrismaModule from 'src/prisma/prisma.module';
import PaymentService from './service/payment.service';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export default class PaymentModule {}
