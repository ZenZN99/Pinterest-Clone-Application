import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Reply } from 'src/schemas/reply.schema';
import { ReplyService } from 'src/services/reply.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/reply')
@UseGuards(AuthGuard)
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post('create/:commentId')
  createReply(
    @Body() data: Reply,
    @Req() req: RequestWithUser,
    @Param('commentId') commentId: string,
  ) {
    return this.replyService.createReply(data, req.user._id, commentId);
  }

  @Get('replies')
  getAllReplies() {
    return this.replyService.getAllReplies();
  }

  @Delete('delete/:replyId')
  deleteReply(@Param('replyId') replyId: string, @Req() req: RequestWithUser) {
    return this.replyService.deleteReply(replyId, req.user);
  }

  @Get(':commentId')
  getRepliesByComment(@Param('commentId') commentId: string) {
    return this.replyService.getRepliesByComment(commentId);
  }
}
