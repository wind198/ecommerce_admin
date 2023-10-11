import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class ResizeImagePipe implements PipeTransform {
  async transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    if (!file.buffer) {
      throw new BadRequestException('Invalid file format.');
    }

    const extension = extname(file.originalname);
    // const resizedImageBuffer = await sharp(file.buffer).resize({ width: 40, height: 40 }).toBuffer();

    return {
      originalname: file.originalname,
      buffer: file.buffer,
      mimetype: `image/${extension.substring(1)}`, // Remove the dot from the extension
    };
  }
}
