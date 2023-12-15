import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EventMessage } from '@app/@core/notification/dto/event-message.dto';
import { Exclude } from 'class-transformer';

export type NotifyDocument = HydratedDocument<Notify>;

@Schema()
export class Notify {
  @Prop({ required: false })
  userId: string;

  @Prop({ required: false })
  participants: string[];

  @Prop({ required: true })
  event: `${EventMessage}`;

  @Prop({ required: false })
  message?: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now })
  @Exclude()
  public createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  @Exclude()
  public updatedAt: Date;

  @Prop({ type: Date, default: null })
  @Exclude()
  public deletedAt: Date;
}

export const NotifySchema = SchemaFactory.createForClass(Notify);
