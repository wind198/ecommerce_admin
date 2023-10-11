import { IHasId, ITimeStamp } from '../../common/types';

export type IOrderCustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addess: string;
};

export type IOrderProductInfo = { categoryId: string; productId: string; quantity: number; price: number };

export interface IOrderCoreField {
  products: Array<IOrderProductInfo>;
  totalAmount: number;
  status: IOrderStatus;
  user: IOrderCustomerInfo;
}

export type IOrder = IOrderCoreField & IHasId & ITimeStamp;

export const OrderStatusList = ['pending', 'processing', 'shipped', 'delivered', 'canceled'] as const;
export type IOrderStatus = (typeof OrderStatusList)[number];
