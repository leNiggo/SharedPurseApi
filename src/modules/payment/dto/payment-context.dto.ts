import { IsUUID } from 'class-validator';

export default class PaymentContext {
  @IsUUID()
  id!: string;
}
