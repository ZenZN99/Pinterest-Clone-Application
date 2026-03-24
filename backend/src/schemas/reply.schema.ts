import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Comment } from './comment.schema';

export type ReplyDocument = Reply & Document;

@Schema({ timestamps: true })
export class Reply {
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
    ref: Comment.name,
  })
  commentId: string;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
