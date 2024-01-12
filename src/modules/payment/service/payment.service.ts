import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  public async createPayment(userId: string, )
}
