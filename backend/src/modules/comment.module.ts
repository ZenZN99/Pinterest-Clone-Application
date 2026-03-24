import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { TokenModule } from 'src/token/token.module';
import { CommentController } from 'src/controllers/comment.controller';
import { CommentService } from 'src/services/comment.service';
import { NotificationModule } from './notification.module';
import { Pin, PinSchema } from 'src/schemas/pin.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
