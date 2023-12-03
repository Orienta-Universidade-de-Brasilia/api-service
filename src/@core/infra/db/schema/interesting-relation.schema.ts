import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type InterestingRelationDocument = InterestingRelation & Document;

@Schema()
export class InterestingRelation extends BaseSchema {
  @Prop({ required: false })
  userId: string;

  @Prop({ required: false })
  targetId: string; // can be a professor or a student to create a pair up

  @Prop({ required: false, default: false })
  userInterest: boolean;

  @Prop({ required: false, default: false })
  targetInterest: boolean;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  period: number;
}

export const InterestingRelationSchema =
  SchemaFactory.createForClass(InterestingRelation);
