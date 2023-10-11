import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { IOrder, IOrderCustomerInfo, IOrderProductInfo, IOrderStatus, OrderStatusList } from '../entities/order.entity';

class OrderProductInfo implements IOrderProductInfo {
  @IsMongoId()
  categoryId: string;

  @IsMongoId()
  productId: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

class OrderCustomerInfo implements IOrderCustomerInfo {
  @IsString() firstName: string;

  @IsString() lastName: string;

  @IsEmail() email: string;

  @IsPhoneNumber() phone: string;

  @IsString() addess: string;
}

export class CreateOrderDto implements IOrder {
  @IsOptional()
  customerFullName: string; //should be derived from customer, included here just to beat type errors

  @IsOptional()
  totalBilling: number; //should be derived from products, included here just to beat type errors

  @IsOptional()
  totalItems: number; //should be derived from products, included here just to beat type errors

  @IsArray()
  @ValidateNested()
  products: OrderProductInfo[];

  @IsEnum(OrderStatusList)
  status: IOrderStatus;

  @ValidateNested()
  customer: OrderCustomerInfo;
}
