import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from 'src/enums/user.enum';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({ type: String, required: true, minlength: 8 })
  password: string;

  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg',
  })
  avatar: string;

  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/dgagbheuj/image/upload/v1763194811/cover-default-image_uunwq6.jpg',
  })
  cover: string;

  @Prop({ type: String, default: '' })
  bio: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

