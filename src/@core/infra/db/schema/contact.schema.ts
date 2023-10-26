import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact extends BaseSchema {
  @Prop({ type: String, required: false })
  contactEmail?: string;

  @Prop({ type: String, required: false })
  whatsapp?: string;

  @Prop({ type: String, required: false })
  telegram?: string;

  @Prop({ type: String, required: false })
  branch?: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
