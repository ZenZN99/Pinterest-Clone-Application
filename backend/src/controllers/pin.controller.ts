import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Pin } from 'src/schemas/pin.schema';
import { PinService } from 'src/services/pin.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/pin')
@UseGuards(AuthGuard)
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createPin(
    @Body() data: Pin,
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.pinService.createPin(data, req.user, file);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  updatePin(
    @Param('id') id: string,
    @Body() data: Pin,
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.pinService.updatePin(id, data, req.user, file);
  }

  @Delete('delete/:id')
  deletePin(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.pinService.deletePin(id, req.user);
  }

  @Get('pins')
  getAllPins() {
    return this.pinService.getAllPins();
  }

  @Get('user')
  getUserPins(@Req() req: RequestWithUser) {
    return this.pinService.getUserPins(req.user._id);
  }

  @Get(':id')
  getPinById(@Param('id') id: string) {
    return this.pinService.getPinById(id);
  }
}
