export type IOrderCustomerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addess: string;
};

export type IOrderProductInfo = { categoryId: string; productId: string; quantity: number; price: number };

export interface IOrder {
  products: Array<IOrderProductInfo>;
  totalBilling: number;
  totalItems: number;
  status: IOrderStatus;
  customer: IOrderCustomerInfo;
  customerFullName: string;
}

export const OrderStatusList = ['pending', 'processing', 'shipped', 'delivered', 'canceled'];
export type IOrderStatus = (typeof OrderStatusList)[number];
