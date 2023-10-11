import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IMongoId } from '../../common/types/mongo-id';
import { Image } from '../../common/types/image';
import { IOrder, IOrderCustomerInfo, IOrderProductInfo, IOrderStatus } from './order.entity';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ versionKey: false, timestamps: false })
export class OrderCustomerInfo implements IOrderCustomerInfo {
  @Prop({ required: true }) firstName: string;

  @Prop({ required: true }) lastName: string;

  @Prop({ required: true, index: true }) email: string;

  @Prop({ required: true, index: true }) phone: string;

  @Prop({ required: true }) addess: string;
}

@Schema({ versionKey: false, timestamps: false })
export class OrderProductInfo implements IOrderProductInfo {
  @Prop({ required: true, index: true }) categoryId: string;

  @Prop({ required: true, index: true }) productId: string;

  @Prop({ required: true }) quantity: number;

  @Prop({ required: true }) price: number;
}

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: false,
  },
})
export class Order implements IOrder, IMongoId {
  _id: Types.ObjectId;

  @Prop({ required: true, index: true })
  customerFullName: string;

  @Prop([{ type: OrderProductInfo, default: [], minlength: 1 }])
  products: OrderProductInfo[];

  @Prop({ required: true })
  status: IOrderStatus;

  @Prop({ required: true, schema: OrderCustomerInfo })
  customer: OrderCustomerInfo;

  @Prop({ required: true, index: true })
  totalBilling: number;

  @Prop({ required: true, index: true })
  totalItems: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ createdAt: -1 });
