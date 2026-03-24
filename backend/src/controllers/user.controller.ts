import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() data: User) {
    return this.userService.register(data);
  }

  @Post('login')
  login(@Body() data: User) {
    return this.userService.login(data);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: RequestWithUser) {
    return this.userService.me(req.user);
  }

  @Put('update/profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  updateProfile(
    @Req() req: RequestWithUser,
    @UploadedFiles()
    files: { avatar: Express.Multer.File[]; cover: Express.Multer.File[] },
    @Body() body: User,
  ) {
    const bio = body.bio;
    return this.userService.updateProfile(req.user, files, bio);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  getAllUsers(@Req() req: RequestWithUser) {
    return this.userService.getAllUsers(req.user._id);
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Delete('user/:id')
  @UseGuards(AuthGuard, AdminGuard)
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
