import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { IProductCoreField } from './product.entity';
import { Category } from '../../category/entities/category.schema';
import { Image } from '../../common/types/image';
import { IMongoId } from '../../common/types/mongo-id';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: false,
  },
})
export class Product implements IProductCoreField, IMongoId {
  _id: Types.ObjectId;

  @Prop({ schema: [{ type: Image }], default: [] })
  images: Image[];

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ required: true, min: 0 })
  itemSold: number;

  @Prop({ required: true, maxlength: 100 })
  name: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ createdAt: -1 });
