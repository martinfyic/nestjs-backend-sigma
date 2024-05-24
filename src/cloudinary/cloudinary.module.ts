import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
  imports: [ConfigModule],
})
export class CloudinaryModule {}
