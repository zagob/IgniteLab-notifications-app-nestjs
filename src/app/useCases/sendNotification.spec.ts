import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { SendNotification } from './sendNotification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(
      inMemoryNotificationsRepository,
    );

    const { notification } = await sendNotification.execute({
      category: 'This is a notification',
      content: 'social',
      recipientId: 'example-id',
    });

    expect(inMemoryNotificationsRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationsRepository.notifications[0]).toEqual(
      notification,
    );
  });
});
