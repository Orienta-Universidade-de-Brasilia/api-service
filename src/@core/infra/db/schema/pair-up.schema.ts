import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';
import { User } from './user.schema';

export type PairUpDocument = PairUp & Document;

@Schema()
export class PairUp extends BaseSchema {
  @Prop({ required: false })
  firstStudent?: User;

  @Prop({ required: false })
  secondStudent?: User;
}

export const PairUpSchema = SchemaFactory.createForClass(PairUp);
