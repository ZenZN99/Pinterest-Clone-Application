import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/user.controller';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Follow, FollowSchema } from 'src/schemas/follow.schema';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import {
  Notification,
  NotificationSchema,
} from 'src/schemas/notification.schema';
import { Pin, PinSchema } from 'src/schemas/pin.schema';
import { Reply, ReplySchema } from 'src/schemas/reply.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
