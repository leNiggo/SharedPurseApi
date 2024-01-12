import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import PaymentService from '../service/payment.service';
import UserRequest from 'src/modules/auth/dto/user-request.dto';
import CreatePaymentDTO from '../dto/create-payment.dto';
import { CreatePaymentResponse } from '../dto/create-payment-response.dto';
import PaymentContext from '../dto/payment-context.dto';
import PaymentDTO from '../dto/payment.dto';
import { mapToPaymentDTO } from '../mapper/payment.mapper';
import UpdatePaymentDTO from '../dto/update-payment.dto';
import PaymentListDTO from '../dto/payment-list.dto';

@ApiTags('Payment')
@ApiInternalServerErrorResponse()
@ApiBadRequestResponse()
@Controller('payment')
export default class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiCreatedResponse()
  public async createPayment(
    @Req() req: UserRequest,
    @Body() fields: CreatePaymentDTO,
  ): Promise<CreatePaymentResponse> {
    const newPayment = await this.paymentService.createPayment(
      req.user.userId,
      fields,
    );

    return {
      id: newPayment.id,
    };
  }

  @Get(':groupId')
  @ApiOkResponse()
  public async getManyPayments(
    @Param('groupId', ParseUUIDPipe) groupId: string,
  ): Promise<PaymentListDTO> {
    const payments = await this.paymentService.getPaymentByGroup(groupId);

    return {
      payments: payments.map(mapToPaymentDTO),
    };
  }

  @Get(':id')
  @ApiOkResponse()
  public async getPayment(
    @Param() context: PaymentContext,
  ): Promise<PaymentDTO> {
    const payment = await this.paymentService.getPayment(context.id);

    return mapToPaymentDTO(payment);
  }

  @Patch(':id')
  @ApiOkResponse()
  public async updatePayment(
    @Req() req: UserRequest,
    @Param() context: PaymentContext,
    @Body() fields: UpdatePaymentDTO,
  ) {
    await this.paymentService.updatePayment(
      context.id,
      req.user.userId,
      fields,
    );
  }

  @Delete(':id')
  @ApiOkResponse()
  public async deletePayment(@Param() context: PaymentContext) {
    await this.paymentService.deletePayment(context.id);
  }
}
