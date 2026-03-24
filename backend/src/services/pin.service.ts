import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PinCategory } from 'src/enums/pin.enum';
import { UserRole } from 'src/enums/user.enum';
import cloudinary, { uploadToCloudinary } from 'src/libs/cloudinary';
import { Pin, PinDocument } from 'src/schemas/pin.schema';
import { AuthUser } from 'src/types/auth-user.interface';
import { NotificationService } from './notification.service';
import { Follow, FollowDocument } from 'src/schemas/follow.schema';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class PinService {
  constructor(
    @InjectModel(Pin.name) private readonly pinModel: Model<PinDocument>,
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async createPin(data: Pin, authUser: AuthUser, file: Express.Multer.File) {
    const { title, content, category } = data;
    if (!title || !content || !category) {
      throw new BadRequestException('All fields are required');
    }

    if (!file) {
      throw new BadRequestException('Image is required');
    }

    const allowedCategories = Object.values(PinCategory);
    if (!allowedCategories.includes(category as PinCategory)) {
      throw new BadRequestException(
        `Invalid category. Allowed categories are: ${allowedCategories.join(', ')}`,
      );
    }

    const upload = await uploadToCloudinary(file, 'images');

    const newPin = await this.pinModel.create({
      title,
      content,
      image: upload.secure_url,
      category,
      userId: authUser._id,
    });

    const followers = await this.followModel
      .find({ following: authUser._id })
      .lean();

    if (followers.length > 0) {
      for (const follower of followers) {
        await this.notificationService.createNotification({
          receiverId: follower.follower,
          senderId: authUser._id.toString(),
          type: NotificationType.PIN,
          targetId: newPin._id.toString(),
          isRead: false,
        });
      }
    }

    return newPin;
  }

  async updatePin(
    id: string,
    data: Pin,
    authUser: AuthUser,
    file: Express.Multer.File,
  ) {
    const pin = await this.pinModel.findById(id);

    if (!pin) {
      throw new NotFoundException('Pin not found');
    }

    const isOwner = pin.userId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new UnauthorizedException('Not allowed');
    }

    const allowedCategories = Object.values(PinCategory);
    if (!allowedCategories.includes(data.category as PinCategory)) {
      throw new BadRequestException(
        `Invalid category. Allowed categories are: ${allowedCategories.join(', ')}`,
      );
    }

    if (file) {
      const publicId = pin.image.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.v2.uploader.destroy(`images/${publicId}`);
      }

      const upload = await uploadToCloudinary(file, 'images');
      pin.image = upload.secure_url;
    }

    await pin.updateOne({
      title: data.title ?? pin.title,
      content: data.content ?? pin.content,
      category: data.category ?? pin.category,
      image: data.image ?? pin.image,
    });

    return pin;
  }
  async deletePin(id: string, authUser: AuthUser) {
    const pin = await this.pinModel.findById(id);

    if (!pin) {
      throw new NotFoundException('Image not found');
    }

    const isOwner = pin.userId === authUser._id;
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new UnauthorizedException('Not allowed');
    }

    const publicId = pin.image.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.v2.uploader.destroy(`images/${publicId}`);
    }

    await pin.deleteOne();

    return { success: 'Image deleted successfully' };
  }

  async getAllPins() {
    const pins = await this.pinModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .populate('userId', 'fullname email avatar');
    return pins;
  }

  async getUserPins(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const pins = await this.pinModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return pins;
  }

  async getPinById(id: string) {
    if (!id) {
      throw new BadRequestException('Pin ID is required');
    }

    const pin = await this.pinModel
      .findById(id)
      .lean()
      .populate('userId', 'fullname email avatar');

    if (!pin) {
      throw new NotFoundException('Pin not found');
    }

    return pin;
  }
}
