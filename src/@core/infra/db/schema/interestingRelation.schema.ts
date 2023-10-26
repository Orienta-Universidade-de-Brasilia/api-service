import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';
import { PairUp } from './pairUp.schema';

export type InterestingRelationDocument = InterestingRelation & Document;

@Schema()
export class InterestingRelation extends BaseSchema {
  @Prop({ required: false })
  professor?: User;

  @Prop({ required: false })
  student?: User | PairUp;

  @Prop({ required: false })
  professorInterest?: boolean;

  @Prop({ required: false })
  studentInterest?: boolean;
}

export const InterestingRelationSchema =
  SchemaFactory.createForClass(InterestingRelation);
