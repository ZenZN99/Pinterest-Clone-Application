import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationType } from 'src/enums/notification.enum';
import { User } from './user.schema';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({
    required: true,
    type: String,
    ref: User.name,
  })
  receiverId: string;

  @Prop({
    required: true,
    type: String,
    ref: User.name,
  })
  senderId: string;

  @Prop({
    required: true,
    enum: Object.values(NotificationType),
  })
  type: NotificationType;

  @Prop({
    required: true,
    type: String,
  })
  targetId: string;

  @Prop({
    default: false,
  })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);