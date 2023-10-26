import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';
import { TimerHelper } from '@app/@core/utils/timer-helper';

export type CodeDocument = Code & Document;

@Schema()
export class Code extends BaseSchema {
  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({
    type: Date,
    required: true,
    default: TimerHelper.expiresTime(),
  })
  expireIn: Date;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
