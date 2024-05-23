import { join } from 'path';
import { existsSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  findOneProductImage(imageName: string) {
    const path = join(__dirname, '../../static/products', imageName);
    if (!existsSync)
      throw new BadRequestException(
        `Not product found with image ${imageName}`,
      );

    return path;
  }
}
