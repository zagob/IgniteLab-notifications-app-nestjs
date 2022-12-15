import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFound } from '../errors/notificationNotFound';
import { UnreadNotification } from './unreadNotification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(
      inMemoryNotificationsRepository,
    );

    const notification = new Notification(
      makeNotification({
        readAt: new Date(),
      }),
    );

    await inMemoryNotificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(
      inMemoryNotificationsRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
