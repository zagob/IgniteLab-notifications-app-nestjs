import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { GetRecipientNotifications } from './getRecipientNotifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const inMemoryNotificationsRepository =
      new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
