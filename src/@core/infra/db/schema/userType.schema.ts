import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type UserTypeDocument = UserType & Document;

@Schema()
export class UserType extends BaseSchema {
  @Prop({ type: String, required: false })
  description?: string;
}

export const UserTypeSchema = SchemaFactory.createForClass(UserType);
