import { Module } from '@nestjs/common';
import { SendNotification } from '@app/useCases/sendNotification/sendNotification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@app/useCases/cancelNotification/cancelNotification';
import { CountRecipientNotifications } from '@app/useCases/countRecipientNotifications/countRecipientNotifications';
import { GetRecipientNotifications } from '@app/useCases/getRecipientNotifications/getRecipientNotifications';
import { ReadNotification } from '@app/useCases/readNotification/readNotification';
import { UnreadNotification } from '@app/useCases/unreadNotification/unreadNotification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
