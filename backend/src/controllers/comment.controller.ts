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
import { Comment } from 'src/schemas/comment.schema';
import { CommentService } from 'src/services/comment.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/comment')
@UseGuards(AuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create/:pinId')
  createComment(
    @Body() data: Comment,
    @Req() req: RequestWithUser,
    @Param('pinId') pinId: string,
  ) {
    return this.commentService.createComment(data, req.user._id, pinId);
  }

  @Put('update/:commentId')
  updateComment(
    @Body() body: Comment,
    @Req() req: RequestWithUser,
    @Param('commentId') commentId: string,
  ) {
    const text = body.text;
    return this.commentService.updateComment(text, req.user, commentId);
  }

  @Delete('delete/:commentId')
  deleteComment(
    @Param('commentId') commentId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.commentService.deleteComment(commentId, req.user);
  }

  @Get('pin/:pinId')
  getCommentsByPin(@Param('pinId') pinId: string) {
    return this.commentService.getCommentsByPin(pinId);
  }

  @Get('comments')
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get('user')
  getCommentsByUser(@Req() req: RequestWithUser) {
    return this.commentService.getCommentsByUser(req.user._id);
  }
}
