import { Notify } from '@app/@core/infra/db/schema/notification.schema';
import { EventMessage } from '@app/@core/notification/dto/event-message.dto';

export const NotifyRepositoryKey = 'INotifyRepositoryKey';
export interface INotifyRepository {
  create(
    userId: string,
    event: `${EventMessage}`,
    message?: string | string[],
  ): Promise<Notify>;
  getNotificationsByUserId(
    userId: string,
    period: number,
    year: number,
  ): Promise<Notify[]>;
  getNotificationOnTarget(
    userId: string,
    targetId: string,
    period: number,
    year: number,
  ): Promise<Notify>;
}
