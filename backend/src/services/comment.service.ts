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
import { Pin, PinDocument } from 'src/schemas/pin.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AuthUser } from 'src/types/auth-user.interface';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Pin.name) private readonly pinModel: Model<PinDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async createComment(data: Comment, userId: string, pinId: string) {
    const { text } = data;
    if (!text) {
      throw new BadRequestException('Text comment is required');
    }

    const pin = await this.pinModel.findById(pinId);
    if (!pin) {
      throw new NotFoundException('Pin not found!');
    }

    const comment = await this.commentModel.create({
      text,
      userId: userId,
      pinId: pin._id.toString(),
    });

    if (pin.userId !== userId) {
      await this.notificationService.createNotification({
        receiverId: pin.userId,
        senderId: userId,
        type: NotificationType.COMMENT,
        targetId: comment._id.toString(),
        isRead: false,
      });
    }

    return comment;
  }

  async updateComment(text: string, authUser: AuthUser, commentId: string) {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const isOwner = comment.userId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new UnauthorizedException('Not allowed');
    }

    comment.text = text;
    return await comment.save();
  }

  async deleteComment(commentId: string, authUser: AuthUser) {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const isOwner = comment.userId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new UnauthorizedException('Not allowed');
    }

    await comment.deleteOne();

    return {
      success: 'Comment deleted successfully',
    };
  }
  async getCommentsByPin(pinId: string) {
    const pin = await this.pinModel.findById(pinId);
    if (!pin) {
      throw new NotFoundException('Pin not found!');
    }

    return await this.commentModel
      .find({ pinId: pin._id.toString() })
      .sort({ createdAt: -1 })
      .lean()
      .populate('userId', 'fullname email avatar');
  }

  async getAllComments() {
    const comments = await this.commentModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .populate('userId', 'fullname email avatar');
    return comments;
  }
  async getCommentsByUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return await this.commentModel
      .find({ userId: user._id.toString() })
      .sort({ createdAt: -1 })
      .lean();
  }
}
