import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from 'src/enums/user.enum';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Reply, ReplyDocument } from 'src/schemas/reply.schema';
import { AuthUser } from 'src/types/auth-user.interface';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class ReplyService {
  constructor(
    @InjectModel(Reply.name) private readonly replyModel: Model<ReplyDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async createReply(data: Reply, userId: string, commentId: string) {
    const { text } = data;
    if (!text) {
      throw new BadRequestException('Text Reply is required');
    }

    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found!');
    }

    const reply = await this.replyModel.create({
      text,
      userId: userId,
      commentId: comment._id.toString(),
    });

    if (comment.userId !== userId) {
      await this.notificationService.createNotification({
        receiverId: comment.userId,
        senderId: userId,
        type: NotificationType.REPLY,
        targetId: reply._id.toString(),
        isRead: false,
      });
    }

    return reply;
  }

  async deleteReply(replyId: string, authUser: AuthUser) {
    const reply = await this.replyModel.findById(replyId);
    if (!reply) {
      throw new NotFoundException('Reply comment not found!');
    }

    const isOwner = reply.userId === authUser._id;
    const isAdmin = authUser.role == UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new UnauthorizedException('Not allowed');
    }

    await reply.deleteOne();
    return { success: 'Reply deleted successfully' };
  }

  async getRepliesByComment(commentId: string) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found!');
    }
    return await this.replyModel
      .find({ commentId: comment._id.toString() })
      .sort({ createdAt: -1 })
      .lean()
      .populate('userId', 'fullname email avatar');
  }

  async getAllReplies() {
    const replies = await this.replyModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .populate('userId', 'fullname email avatar');
    return replies;
  }
}
