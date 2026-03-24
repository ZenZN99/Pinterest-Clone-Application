import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PinController } from 'src/controllers/pin.controller';
import { Pin, PinSchema } from 'src/schemas/pin.schema';
import { PinService } from 'src/services/pin.service';
import { TokenModule } from 'src/token/token.module';
import { FollowModule } from './follow.module';
import { NotificationModule } from './notification.module';
import { Follow, FollowSchema } from 'src/schemas/follow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }]),
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [PinController],
  providers: [PinService],
})
export class PinModule {}
