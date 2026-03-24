import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { TokenService } from 'src/token/token.service';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { UserRole } from 'src/enums/user.enum';
import cloudinary, { uploadToCloudinary } from 'src/libs/cloudinary';
import { AuthUser } from 'src/types/auth-user.interface';
import { Pin, PinDocument } from 'src/schemas/pin.schema';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Reply, ReplyDocument } from 'src/schemas/reply.schema';
import { Follow, FollowDocument } from 'src/schemas/follow.schema';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import {
  Notification,
  NotificationDocument,
} from 'src/schemas/notification.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Pin.name) private readonly pinModel: Model<PinDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Reply.name) private readonly replyModel: Model<ReplyDocument>,
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    private readonly tokenService: TokenService,
  ) {}

  async register(data: User) {
    const { fullname, email, password } = data;

    switch (true) {
      case !fullname || !email || !password:
        throw new BadRequestException('All fields are required');
      case !validator.isEmail(email):
        throw new BadRequestException('Invalid Email address');
      case password.length < 8:
        throw new BadRequestException(
          'The password must be at least 8 characters long',
        );
      case password.length > 40:
        throw new BadRequestException(
          'The maximum password length is 40 characters',
        );
    }

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException(
        'Please check your information and try again',
      );
    }

    const hashed = await bcrypt.hash(password, 12);
    const isAdmin =
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD;

    const newUser = await this.userModel.create({
      fullname,
      email,
      password: hashed,
      avatar:
        'https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg',
      cover:
        'https://res.cloudinary.com/dgagbheuj/image/upload/v1763194811/cover-default-image_uunwq6.jpg',
      role: isAdmin ? UserRole.ADMIN : UserRole.USER,
      bio: `Hello Everyone I'm ${fullname}`,
    });

    const token = this.tokenService.generateToken({
      _id: newUser._id.toString(),
      role: newUser.role,
    });

    return {
      success: 'Account created successfully',
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        password: newUser.password,
        avatar: newUser.avatar,
        cover: newUser.cover,
        role: newUser.role,
        bio: newUser.bio,
      },
      token,
    };
  }
  async login(data: User) {
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestException('All fields are required');
    }
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Incorrect password or email address');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Incorrect password or email address');
    }

    const token = this.tokenService.generateToken({
      _id: user._id.toString(),
      role: user.role,
    });

    return {
      success: 'Logged in successfully',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        cover: user.cover,
        role: user.role,
        bio: user.bio,
      },
      token,
    };
  }
  async me(authUser: AuthUser) {
    const user = await this.userModel.findById(authUser._id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      cover: user.cover,
      role: user.role,
      bio: user.bio,
    };
  }
  async updateProfile(
    authUser: AuthUser,
    files: { avatar?: Express.Multer.File[]; cover?: Express.Multer.File[] },
    bio: string,
  ) {
    const user = await this.userModel.findById(authUser._id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const avatarFile = files?.avatar?.[0];
    const coverFile = files?.cover?.[0];

    const updatedData: Partial<User> = {};

    const extractPublicId = (url: string): string => {
      const parts = url.split('/');
      const file = parts.pop()!;
      return file.split('.')[0];
    };

    if (avatarFile) {
      if (user.avatar?.includes('res.cloudinary.com')) {
        const oldId = extractPublicId(user.avatar);
        await cloudinary.v2.uploader.destroy(`users/avatars/${oldId}`);
      }

      const avatarUpload = await uploadToCloudinary(
        avatarFile,
        'users/avatars',
      );

      updatedData.avatar = avatarUpload.secure_url;
    }

    if (coverFile) {
      if (user.cover?.includes('res.cloudinary.com')) {
        const oldId = extractPublicId(user.cover);
        await cloudinary.v2.uploader.destroy(`users/covers/${oldId}`);
      }

      const coverUpload = await uploadToCloudinary(coverFile, 'users/covers');

      if (bio !== undefined) {
        updatedData.bio = bio;
      }

      updatedData.cover = coverUpload.secure_url;
    }

    await user.updateOne(updatedData);

    return {
      success: 'Profile updated successfully',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        avatar: user.avatar,
        cover: user.cover,
        role: user.role,
        bio: user.bio,
      },
    };
  }

  async getAllUsers(userId: string) {
    const users = await this.userModel
      .find({ _id: { $ne: userId } })
      .sort({ createdAt: -1 })
      .lean();

    return users;
  }
  async getUserById(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const extractPublicId = (url: string): string => {
      const parts = url.split('/');
      const file = parts.pop()!;
      return file.split('.')[0];
    };

    try {
      if (
        user.avatar?.includes('res.cloudinary.com') &&
        user.avatar.includes('avatar-default-image')
      ) {
        const oldAvatarId = extractPublicId(user.avatar);
        await cloudinary.v2.uploader.destroy(`users/avatars/${oldAvatarId}`);
      }

      if (
        user.cover?.includes('res.cloudinary.com') &&
        user.cover.includes('cover-default-image')
      ) {
        const oldCoverId = extractPublicId(user.cover);
        await cloudinary.v2.uploader.destroy(`users/covers/${oldCoverId}`);
      }
    } catch (err) {
      console.warn('Failed to delete user images:', err.message);
    }

    await this.pinModel.deleteMany({ userId: id });
    await this.commentModel.deleteMany({ userId: id });
    await this.replyModel.deleteMany({ userId: id });
    await this.followModel.deleteMany({
      $or: [{ follower: id }, { following: id }],
    });
    await this.messageModel.deleteMany({ userId: id });
    await this.notificationModel.deleteMany({ senderId: id });
    await user.deleteOne();

    return { success: 'User deleted successfully' };
  }
}
