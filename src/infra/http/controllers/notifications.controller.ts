import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/useCases/sendNotification/sendNotification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../viewModels/notificationViewModel';
import { CancelNotification } from '@app/useCases/cancelNotification/cancelNotification';
import { ReadNotification } from '@app/useCases/readNotification/readNotification';
import { UnreadNotification } from '@app/useCases/unreadNotification/unreadNotification';
import { CountRecipientNotifications } from '@app/useCases/countRecipientNotifications/countRecipientNotifications';
import { GetRecipientNotifications } from '@app/useCases/getRecipientNotifications/getRecipientNotifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }
}
