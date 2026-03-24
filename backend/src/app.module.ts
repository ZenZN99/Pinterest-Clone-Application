import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.module';
import { CommentModule } from './modules/comment.module';
import { FollowModule } from './modules/follow.module';
import { MessageModule } from './modules/message.module';
import { NotificationModule } from './modules/notification.module';
import { PinModule } from './modules/pin.module';
import { ReplyModule } from './modules/reply.module';
import { TokenModule } from './token/token.module';
import { ChatGateway } from './gateways/chat.gateway';
import { NotificationGateway } from './gateways/notification.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    CommentModule,
    FollowModule,
    MessageModule,
    NotificationModule,
    PinModule,
    ReplyModule,
    UserModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, NotificationGateway],
})
export class AppModule {}
