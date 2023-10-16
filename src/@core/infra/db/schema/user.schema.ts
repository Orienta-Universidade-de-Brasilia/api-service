import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';
import * as bcrypt from 'bcrypt';
import { UserType } from '@app/@core/user/types/user.types';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseSchema {
  @Prop({ type: String, required: false })
  firstName?: string;

  @Prop({ type: String, required: false })
  lastName?: string;

  @Prop({ type: String, required: false })
  fullName?: string;

  @Prop({ type: String, required: false })
  globalId?: string; // matricula

  @Prop({ type: String, required: false })
  cellPhone?: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: false })
  imageUrl?: string;

  @Prop({ type: String, enum: UserType, required: false })
  role?: `${UserType}`;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ required: true })
  interestArea?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
