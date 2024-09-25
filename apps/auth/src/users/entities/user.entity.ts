import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ timestamps: true, versionKey: false })
export class User extends AbstractDocument {
  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  accountNumber: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  emailAddress: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  identityNumber: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
