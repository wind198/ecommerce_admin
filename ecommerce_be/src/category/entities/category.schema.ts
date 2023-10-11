import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ICategoryCoreField } from './category.entity';
import { IMongoId } from '../../common/types/mongo-id';
import { Image } from '../../common/types/image';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: false,
  },
})
export class Category implements ICategoryCoreField, IMongoId {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ schema: Image })
  icon?: Image;

  @Prop({ default: [], schema: [Image] })
  images?: Image[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ createdAt: -1 });
