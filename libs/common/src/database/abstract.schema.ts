import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId, SchemaTypes } from 'mongoose';

@Schema()
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: ObjectId;
}
