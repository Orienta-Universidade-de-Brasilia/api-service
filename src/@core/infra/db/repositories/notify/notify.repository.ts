import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notify, NotifyDocument } from '../../schema/notification.schema';
import { INotifyRepository } from '@app/@core/interfaces/notify/notify.interface';
import { EventMessage } from '@app/@core/notification/dto/event-message.dto';

@Injectable()
export class NotifyRepository implements INotifyRepository {
  constructor(
    @InjectModel(Notify.name)
    private readonly notifyModel: Model<NotifyDocument>,
  ) {}
  async create(
    event: `${EventMessage}`,
    userId?: string,
    participants?: string[],
    message?: string,
  ): Promise<Notify> {
    const model = new this.notifyModel({
      event,
      userId,
      participants,
      message,
    });
    return await model.save();
  }

  async getNotificationsByUserId(userId: string): Promise<Notify[]> {
    const notifications = await this.notifyModel
      .aggregate([
        {
          $match: {
            $or: [
              { userId },
              {
                participants: {
                  $in: [userId],
                },
              },
            ],
          },
        },
      ])
      .exec();
    return notifications;
  }
  async getNotificationOnTarget(
    userId: string,
    targetId: string,
    period: number,
    year: number,
  ): Promise<Notify> {
    return await this.notifyModel
      .findOne({
        userId,
        targetId,
        period,
        year,
      })
      .lean();
  }
}
