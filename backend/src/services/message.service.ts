import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadToCloudinary } from 'src/libs/cloudinary';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async sendMessage(
    senderId: string,
    data: Message,
    file: Express.Multer.File,
  ) {
    const { receiverId, content } = data;
    if (!receiverId) {
      throw new BadRequestException('Receiver ID is required');
    }

    if ((!content || content.trim() === '') && !file) {
      throw new BadRequestException(
        'Message must contain text or at least one image',
      );
    }

    let imageUrl = '';
    if (file) {
      const uploadResult = await uploadToCloudinary(file, 'messages');
      imageUrl = uploadResult.secure_url;
    }

    return await this.messageModel.create({
      senderId,
      receiverId,
      content: content || '',
      image: imageUrl,
      isRead: false,
    });
  }

  async getChatMessages(senderId: string, receiverId: string) {
    return await this.messageModel
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort({ createdAt: 1 });
  }

  async deleteMessage(userId: string, messageId: string) {
    const message = await this.messageModel.findByIdAndDelete({
      _id: messageId,
      senderId: userId,
    });

    if (!message) {
      throw new BadRequestException('Message not found!');
    }

    return {
      success: 'Message deleted successfully',
      message: message,
    };
  }
  async markMessageAsRead(userId: string, senderId: string) {
    const result = await this.messageModel.updateMany(
      {
        senderId: senderId,
        receiverId: userId,
        isRead: false,
      },
      {
        $set: { isRead: true },
      },
    );

    return {
      success: 'Messages marked as read successfully',
      modifiedCount: result.modifiedCount,
    };
  }
}
