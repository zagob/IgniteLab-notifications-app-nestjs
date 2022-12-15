import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CancelNotification } from './cancelNotification';
import { NotificationNotFound } from '../errors/notificationNotFound';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      inMemoryNotificationsRepository,
    );

    const notification = new Notification(makeNotification());

    await inMemoryNotificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(inMemoryNotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      inMemoryNotificationsRepository,
    );

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
