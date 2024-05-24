import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class CloudinaryController {
  private readonly logger = new Logger(CloudinaryController.name);
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file);
      const result = await this.cloudinaryService.uploadImageCloud(file);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  @Get()
  getImageCloud() {
    return this.cloudinaryService.getImageCloud();
  }
}
