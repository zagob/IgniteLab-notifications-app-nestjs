import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CountRecipientNotifications } from './countRecipientNotifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      inMemoryNotificationsRepository,
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await inMemoryNotificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
