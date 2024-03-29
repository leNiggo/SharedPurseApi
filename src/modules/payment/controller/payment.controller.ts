import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JWT_AUTH } from 'src/constants/global';
import UserRequest from 'src/modules/auth/dto/user-request.dto';
import { CreatePaymentResponse } from '../dto/create-payment-response.dto';
import CreatePaymentDTO from '../dto/create-payment.dto';
import PaymentContext from '../dto/payment-context.dto';
import PaymentListDTO from '../dto/payment-list.dto';
import PaymentDTO from '../dto/payment.dto';
import UpdatePaymentDTO from '../dto/update-payment.dto';
import { mapToPaymentDTO } from '../mapper/payment.mapper';
import PaymentService from '../service/payment.service';

@ApiTags('Payment')
@ApiInternalServerErrorResponse()
@ApiBadRequestResponse()
@ApiBearerAuth(JWT_AUTH)
@Controller('payment')
export default class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreatePaymentResponse,
  })
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

  @Get('many/:groupId')
  @ApiOkResponse({
    type: PaymentListDTO,
  })
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

  @Patch('/accept/:id')
  @ApiOkResponse()
  public async acceptPayment(
    @Req() req: UserRequest,
    @Param() context: PaymentContext,
  ) {
    await this.paymentService.acceptPayment(req.user.userId, context.id);
  }
}
