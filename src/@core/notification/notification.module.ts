import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notify, NotifySchema } from '../infra/db/schema/notification.schema';
import { NotifyRepository } from '../infra/db/repositories/notify/notify.repository';
import { NotifyRepositoryKey } from '../interfaces/notify/notify.interface';
import { NotificationsController } from './notification.controller';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MongooseModule.forFeature([{ name: Notify.name, schema: NotifySchema }]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationService,
    {
      useClass: NotifyRepository,
      provide: NotifyRepositoryKey,
    },
  ],
  exports: [NotificationService, NotifyRepositoryKey],
})
export class NotificationModule {}
