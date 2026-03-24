import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Pin } from './pin.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    type: String,
    required: true,
  })
  text: string;

  @Prop({
    type: String,
    required: true,
    ref: User.name,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
    ref: Pin.name,
  })
  pinId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
