import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type PeriodDocument = Period & Document;

@Schema()
export class Period extends BaseSchema {
  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  period: number;

  @Prop({ required: true })
  userId: string;
}

export const PeriodSchema = SchemaFactory.createForClass(Period);
