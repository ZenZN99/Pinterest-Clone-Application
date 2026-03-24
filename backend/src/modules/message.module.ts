import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from 'src/controllers/message.controller';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { MessageService } from 'src/services/message.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    TokenModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
