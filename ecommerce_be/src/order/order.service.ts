import { CategoryService } from './../category/category.service';
import { Injectable } from '@nestjs/common';
import { BasicApiService } from '../common/types/basic-api.service';
import { Order } from './entities/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { getRandomItem } from '../common/helper';
import { IOrderProductInfo, OrderStatusList } from './entities/order.entity';
import { IProductCoreField } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';
import { sumBy } from 'lodash';

@Injectable()
export class OrderService extends BasicApiService<Order, CreateOrderDto, UpdateOrderDto> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private categoryService: CategoryService,
    private productService: ProductsService,
  ) {
    super(orderModel);
  }

  async generateProductsForMockOrder() {
    const products = await this.productService.findAll();
    return Array(faker.number.int({ min: 1, max: 10 }))
      .fill(0)
      .map(() => {
        const randomProduct = getRandomItem(products);
        if (!randomProduct) {
          return;
        }
        return {
          categoryId: randomProduct.category._id.toString(),
          productId: randomProduct._id.toString(),
          name: randomProduct.name,
          price: faker.number.int({ min: 1, max: 100 }),
          quantity: faker.number.int({ min: 1, max: 20 }),
        };
      })
      .filter(Boolean);
  }

  async generateMockOrder() {
    const order = new CreateOrderDto();
    order.status = getRandomItem(OrderStatusList);
    order.customer = {
      addess: faker.location.streetAddress(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
    };
    order.products = await this.generateProductsForMockOrder();
    order.totalBilling = this.calculateTotalAmountForOrderProducts(order.products);
    order.totalItems = this.calculateTotalItemsForOrderProducts(order.products);
    order.customerFullName = `${order.customer.firstName} ${order.customer.lastName}`.trim();
    return order;
  }

  calculateTotalAmountForOrderProducts(items: IOrderProductInfo[]) {
    return sumBy(items, (i) => i.price * i.quantity);
  }

  calculateTotalItemsForOrderProducts(items: IOrderProductInfo[]) {
    return sumBy(items, (i) => i.quantity);
  }

  async mockInitialData() {
    return await Promise.all(
      Array(200)
        .fill(0)
        .map(async () => {
          const o = await this.generateMockOrder();
          return await this.create(o);
        }),
    );
  }
}
