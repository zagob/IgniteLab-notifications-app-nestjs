import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFound } from '../errors/notificationNotFound';
import { ReadNotification } from './readNotification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(
      inMemoryNotificationsRepository,
    );

    const notification = new Notification(makeNotification());

    await inMemoryNotificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(inMemoryNotificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(
      inMemoryNotificationsRepository,
    );

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
