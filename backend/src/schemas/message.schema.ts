import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({
    type: String,
    required: true,
    ref: User.name,
  })
  senderId: string;

  @Prop({
    type: String,
    required: true,
    ref: User.name,
  })
  receiverId: string;

  @Prop()
  content: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  isRead: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
