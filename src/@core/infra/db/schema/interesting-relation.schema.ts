import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type InterestingRelationDocument = InterestingRelation & Document;

@Schema()
export class InterestingRelation extends BaseSchema {
  @Prop({ required: false })
  participants: string[];

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
