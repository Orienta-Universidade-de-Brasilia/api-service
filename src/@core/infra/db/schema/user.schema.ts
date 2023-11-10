import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';
import * as bcrypt from 'bcrypt';
import { UserType } from './userType.schema';
import { InterestedArea } from './interestedArea.schema';
import { Availability } from './availability.schema';
import { Exclude } from 'class-transformer';

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

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: false })
  avatarUrl?: string;

  @Prop({ required: false })
  userType?: UserType;

  @Prop({ type: String, required: true })
  @Exclude()
  password: string;

  @Prop({ required: false })
  interestedArea?: InterestedArea[];

  @Prop({ required: false })
  availableToPair?: boolean; // students will set this param

  @Prop({ required: false })
  availability?: Availability; // professor will set this param

  @Prop({ required: true, default: false })
  emailConfirmed?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
