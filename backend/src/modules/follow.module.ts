import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from 'src/schemas/follow.schema';
import { NotificationModule } from './notification.module';
import { TokenModule } from 'src/token/token.module';
import { FollowController } from 'src/controllers/follow.controller';
import { FollowService } from 'src/services/follow.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
