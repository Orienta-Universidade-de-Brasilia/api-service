import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';
import { Department } from './department.schema';

export type CampusInformationDocument = CampusInformation & Document;

@Schema()
export class CampusInformation extends BaseSchema {
  @Prop({ type: String, required: false })
  campus?: string;

  @Prop({ type: String, required: false })
  department?: Department;
}

export const CampusInformationSchema =
  SchemaFactory.createForClass(CampusInformation);
