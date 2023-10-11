import { Prop, Schema } from '@nestjs/mongoose';
import { IMongoId } from './mongo-id';
import { Types } from 'mongoose';
import { IsString, IsUrl } from 'class-validator';

export interface IImage {
  src: string;
  title: string;
}

export class ImageDto implements IImage {
  @IsUrl()
  src: string;

  @IsString()
  title: string;
}

@Schema({ versionKey: false })
export class Image implements IImage, IMongoId {
  _id: Types.ObjectId;

  @Prop({ required: true })
  src: string;

  @Prop({ required: true })
  title: string;
}
