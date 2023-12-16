import { EventMessage } from '../dto/event-message.dto';

type NotifyModelView = {
  event?: `${EventMessage}`;
  message: string;
};

export type NotificationsModelView = {
  notifications: NotifyModelView[];
  message: string;
};
