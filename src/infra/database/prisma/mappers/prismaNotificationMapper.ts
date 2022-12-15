import { Notification as RowNotification } from '@prisma/client';
import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(row: RowNotification): Notification {
    return new Notification(
      {
        category: row.category,
        content: new Content(row.content),
        recipientId: row.recipientId,
        readAt: row.readAt,
        canceledAt: row.canceledAt,
        createdAt: row.createdAt,
      },
      row.id,
    );
  }
}
