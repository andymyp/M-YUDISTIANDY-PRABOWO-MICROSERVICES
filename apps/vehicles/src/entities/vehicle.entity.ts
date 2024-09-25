import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import mongoose from 'mongoose';
import { User } from 'apps/auth/src/users/entities/user.entity';

@Schema({ timestamps: true, versionKey: false })
export class Vehicle extends AbstractDocument {
  @Prop({ type: String, required: true, unique: true, index: true })
  registrationNumber: string;

  @Prop({ type: String, required: true })
  model: string;

  @Prop({ type: Number, required: true })
  year: number;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
VehicleSchema.index({ model: 1, year: -1 });
