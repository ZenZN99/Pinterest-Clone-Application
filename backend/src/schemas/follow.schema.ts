import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type FollowDocument = Follow & Document;

@Schema({ timestamps: true })
export class Follow {
  @Prop({ type: String, ref: User.name, required: true })
  follower: string;

  @Prop({ type: String, ref: User.name, required: true })
  following: string;

  @Prop({ type: Boolean, default: false })
  isFollowing: boolean;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);

FollowSchema.index({ follower: 1, following: 1 }, { unique: true });
