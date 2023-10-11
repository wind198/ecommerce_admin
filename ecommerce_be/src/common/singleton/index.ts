import { randomUUID } from 'crypto';
import { diskStorage, DiskStorageOptions, StorageEngine } from 'multer';
import { extension } from 'mime-types';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import sharp from 'sharp';
import mimeTypes from 'mime-types';
import { resolve } from 'path';
import { mkdir } from 'fs/promises';

export const generateFileName = (file: Express.Multer.File, prefix?: string) =>
  `${prefix ? prefix + '_' : ''}${randomUUID()}_${new Date().getTime().toString()}.${mimeTypes.extension(
    file.mimetype,
  )}`;

export const PublicImageMulterStorage = diskStorage({
  destination(req, file, callback) {
    callback(null, resolve(process.env.PUBLIC_PATH || 'public', 'images'));
  },
  filename(req, file, callback) {
    const filename = generateFileName(file);
    callback(null, filename);
  },
});

export const DiskStorageWithImageResizerFactory = (
  opts: DiskStorageOptions,
  resize: { width?: number; height?: number },
) => {
  const rawDiskStorage = diskStorage(opts);

  const { width, height } = resize;
  if (!width && !height) {
    throw Error('Width or height must be provided');
  }

  rawDiskStorage._handleFile = function _handleFile(req, file, callback) {
    this.getDestination(req, file, (error: Error, destination: string) => {
      if (error) {
        throw error;
      }
      if (!existsSync(destination)) {
        mkdirSync(destination, { recursive: true });
      }
      this.getFilename(req, file, (error: Error, fileName: string) => {
        if (error) {
          throw error;
        }
        const path = resolve(destination, fileName);

        const outStream = createWriteStream(path);
        const resizer = sharp().resize(width, height).png();
        file.stream.pipe(resizer).pipe(outStream);
        outStream.on('error', callback);
        outStream.on('finish', function () {
          callback(null, {
            size: outStream.bytesWritten,
            filename: fileName,
            destination: path,
          });
        });
      });
    });
  };

  return rawDiskStorage;
};
