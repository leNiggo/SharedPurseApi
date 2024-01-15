import { Controller, Get, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import UserRequest from 'src/modules/auth/dto/user-request.dto';
import PaymentListDTO from 'src/modules/payment/dto/payment-list.dto';
import { mapToPaymentWithoutUserDTO } from 'src/modules/payment/mapper/payment.mapper';
import NotifyService from '../service/notify.service';
import GroupListDTO from 'src/modules/group/dto/list-group.dto';
import { mapToGroupListDTO } from 'src/modules/group/mapper/list-group.mapper';
import { JWT_AUTH } from 'src/constants/global';

@ApiTags('Notification')
@ApiInternalServerErrorResponse()
@ApiBadRequestResponse()
@ApiBearerAuth(JWT_AUTH)
@Controller('notification')
export default class NotificationController {
  constructor(private readonly notifyService: NotifyService) {}

  @Get('payment')
  @ApiOkResponse({ type: PaymentListDTO })
  public async getNotificationPayment(
    @Req() req: UserRequest,
  ): Promise<PaymentListDTO> {
    const paymentNotification =
      await this.notifyService.getUnacceptedPaymentNotifications(
        req.user.userId,
      );

    return {
      payments: paymentNotification.map(mapToPaymentWithoutUserDTO),
    };
  }

  @Get('group')
  @ApiOkResponse({
    type: GroupListDTO,
  })
  public async getNotificationGroup(
    @Req() req: UserRequest,
  ): Promise<GroupListDTO> {
    const groupNotification =
      await this.notifyService.getGroupInvitationNotifications(req.user.userId);

    return {
      groups: groupNotification.map(mapToGroupListDTO),
    };
  }
}
