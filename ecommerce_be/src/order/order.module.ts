import { ConfigService } from '@nestjs/config';
import { Module, OnModuleInit } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.schema';
import { ProductsModule } from '../products/products.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ProductsModule,
    CategoryModule,
  ],
})
export class OrderModule implements OnModuleInit {
  appEnv: string;

  constructor(
    private configService: ConfigService,
    private orderService: OrderService,
  ) {
    this.appEnv = this.configService.get('APP_ENV') ?? 'development';
  }

  async onModuleInit() {
    if (this.appEnv === 'development' && !(await this.orderService.countTotal())) {
      await this.orderService.mockInitialData();
    }
  }
}
