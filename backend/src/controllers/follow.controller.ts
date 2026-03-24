import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { FollowService } from 'src/services/follow.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/follow')
@UseGuards(AuthGuard)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':userId')
  followUser(
    @Param('userId') followingId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.followService.followUser(req.user._id, followingId);
  }

  @Delete(':userId')
  unfollowUser(
    @Param('userId') followingId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.followService.unfollowUser(req.user._id, followingId);
  }

  @Get('check/:userId')
  isFollowing(
    @Param('userId') followingId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.followService.isFollowing(req.user._id, followingId);
  }

  @Get('followers/:userId')
  getFollowers(@Param('userId') userId: string) {
    return this.followService.getFollowers(userId);
  }

  @Get('following/:userId')
  getFollowing(@Param('userId') userId: string) {
    return this.followService.getFollowing(userId);
  }

  @Get('followers-count/:userId')
  getFollowersCount(@Param('userId') userId: string) {
    return this.followService.getFollowersCount(userId);
  }

  @Get('following-count/:userId')
  getFollowingCount(@Param('userId') userId: string) {
    return this.followService.getFollowingCount(userId);
  }
}
