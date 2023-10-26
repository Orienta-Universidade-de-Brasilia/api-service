import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type DepartmentDocument = Department & Document;

@Schema()
export class Department extends BaseSchema {
  @Prop({ type: String, required: false })
  description?: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
