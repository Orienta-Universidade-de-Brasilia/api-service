import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Notify } from '../infra/db/schema/notification.schema';
import { UserModelView } from '../auth/model-view/user.mv';
import { EventMessage, EventMessageDto } from './dto/event-message.dto';
import CustomLogger from '@app/common/logger/logger';
import {
  INotifyRepository,
  NotifyRepositoryKey,
} from '../interfaces/notify/notify.interface';
import { NotificationsModelView } from './model-view/get-notifications-by-userid';

@Injectable()
export class NotificationService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(NotifyRepositoryKey)
    private readonly notifyRepository: INotifyRepository,
  ) {}

  async emitter(dto: EventMessageDto, user: UserModelView): Promise<void> {
    const notifyInstance = new Notify();
    notifyInstance.userId = user.id;
    notifyInstance.event = dto.event;
    notifyInstance.message = dto.message;
    await this.eventEmitter.emit(dto.event, notifyInstance);
  }

  @OnEvent(EventMessage.NOTIFY, { async: true })
  async createNotification(notification: Notify): Promise<void> {
    const { userId, event, message } = notification;
    const response = await this.notifyRepository.create(userId, event, message);

    if (!response) {
      CustomLogger.EventError(
        `${EventMessage.NOTIFY} - Failed to create Notification`,
      );
    }
    CustomLogger.EventInfo(`${EventMessage.NOTIFY} - Notification created`);
  }
  @OnEvent(EventMessage.MATCH, { async: true })
  async createMatch(notification: Notify): Promise<void> {
    const { userId, event, message } = notification;
    const response = await this.notifyRepository.create(userId, event, message);

    if (!response) {
      CustomLogger.EventError(
        `${EventMessage.MATCH} - Failed to create Notification`,
      );
    }
    CustomLogger.EventInfo(`${EventMessage.MATCH} - Notification created`);
  }
  @OnEvent(EventMessage.SOLICITATION, { async: true })
  async createSolicitation(notification: Notify): Promise<void> {
    const { userId, event, message } = notification;
    const response = await this.notifyRepository.create(userId, event, message);

    if (!response) {
      CustomLogger.EventError(
        `${EventMessage.SOLICITATION} - Failed to create Notification`,
      );
    }
    CustomLogger.EventInfo(
      `${EventMessage.SOLICITATION} - Notification created`,
    );
  }

  async getNotificationsByUserId(
    userId: string,
    period: number,
    year: number,
  ): Promise<NotificationsModelView> {
    const response = await this.notifyRepository.getNotificationsByUserId(
      userId,
      period,
      year,
    );

    if (!response.length) {
      return {
        notifications: [],
        message: 'There no notifications for this user',
      };
    }

    return {
      notifications: response.map((notify) => {
        return { message: notify.message, event: notify.event };
      }),

      message: 'Notifications fetched successfully',
    };
  }
}
