import { Prop, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export abstract class BaseSchema extends Document {
  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now })
  @Exclude()
  public createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  @Exclude()
  public updatedAt: Date;

  @Prop({ type: Date, default: null })
  @Exclude()
  public deletedAt: Date;
}
