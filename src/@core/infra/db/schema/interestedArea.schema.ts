import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type InterestedAreaDocument = InterestedArea & Document;

@Schema()
export class InterestedArea extends BaseSchema {
  @Prop({ type: String, required: false })
  label?: string;

  @Prop({ type: String, required: false })
  description?: string;
}

export const InterestedAreaSchema =
  SchemaFactory.createForClass(InterestedArea);
