import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from 'src/schemas/follow.schema';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async followUser(follower: string, following: string) {
    if (follower === following) {
      throw new BadRequestException("You can't follow yourself");
    }

    const exists = await this.followModel.findOne({
      follower,
      following,
    });

    if (exists) {
      throw new BadRequestException('Already following this user');
    }

    const follow = await this.followModel.create({
      follower,
      following,
      isFollowing: true,
    });

    await this.notificationService.createNotification({
      receiverId: follow.following,
      senderId: follow.follower,
      type: NotificationType.FOLLOW,
      targetId: follow._id.toString(),
      isRead: false,
    });

    return follow;
  }

  async unfollowUser(follower: string, following: string) {
    const result = await this.followModel.deleteOne({
      follower,
      following,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Follow not found');
    }

    return { message: 'Unfollowed successfully' };
  }

  async isFollowing(follower: string, following: string): Promise<boolean> {
    const follow = await this.followModel.findOne({
      follower,
      following,
    });

    return !!follow;
  }

  async getFollowers(userId: string) {
    const followers = await this.followModel
      .find({ following: userId })
      .populate('follower', 'fullname avatar')
      .lean();

    return followers;
  }

  async getFollowing(userId: string) {
    const following = await this.followModel
      .find({ follower: userId })
      .populate('following', 'fullname avatar')
      .lean();

    return following;
  }

  async getFollowersCount(userId: string): Promise<number> {
    return this.followModel.countDocuments({ following: userId });
  }

  async getFollowingCount(userId: string): Promise<number> {
    return this.followModel.countDocuments({ follower: userId });
  }

}
