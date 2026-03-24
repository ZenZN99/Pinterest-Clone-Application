import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PinCategory } from 'src/enums/pin.enum';
import { User } from './user.schema';

export type PinDocument = Pin & Document;

@Schema({ timestamps: true })
export class Pin {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: String,
    required: true,
  })
  image: string;

  @Prop({
    type: String,
    required: true,
  })
  category: PinCategory;

  @Prop({
    type: String,
    required: true,
    ref: User.name,
  })
  userId: string;
}

export const PinSchema = SchemaFactory.createForClass(Pin);
