import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DiskStorageWithImageResizerFactory, PublicImageMulterStorage, generateFileName } from './common/singleton';
import { ResizeImagePipe } from './common/pipes/resize-image.pipe';
import { ManyIdsDto } from './common/dtos/many-ids';
import { resolve } from 'path';
import { ManyFileNameDto } from './common/dtos/many-filename';
import { IImage } from './common/types/image';

@Controller()
export class AppController {
  BackendUrl: string;

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {
    this.BackendUrl = this.configService.get('BACKEND_URL');
  }

  @Get()
  getHello(): string {
    return `Welcome to ecommerce management service`;
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('images', 10, { preservePath: true, storage: PublicImageMulterStorage }))
  uploadPublicImage(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map(({ filename }) => {
      return { src: `${this.BackendUrl}/images/${filename}` };
    });
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('image', { preservePath: true, storage: PublicImageMulterStorage }))
  upload1PublicImage(@UploadedFile() file: Express.Multer.File) {
    return { src: `${this.BackendUrl}/images/${file.filename}` };
  }

  @Post('icon')
  @UseInterceptors(
    FileInterceptor('icon', {
      preservePath: true,
      storage: DiskStorageWithImageResizerFactory(
        {
          destination: resolve(process.env.PUBLIC_PATH || 'public', 'images'),
          filename(req, file, callback) {
            callback(null, generateFileName(file, 'icon'));
          },
        },
        { height: 40 },
      ),
    }),
  )
  uploadIcon(@UploadedFile() file: Express.Multer.File) {
    const src = `${this.BackendUrl}/images/${file.filename}`;
    return { src } as IImage;
  }
}
