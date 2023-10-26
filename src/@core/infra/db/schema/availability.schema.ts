import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type AvailabilityDocument = Availability & Document;

@Schema()
export class Availability extends BaseSchema {
  @Prop({ required: false })
  amount?: number;

  @Prop({ required: false })
  pairAmount?: number;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
