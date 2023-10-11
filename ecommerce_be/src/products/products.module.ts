import { MongooseModule } from '@nestjs/mongoose';
import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './entities/product.schema';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    CategoryModule,
  ],
})
export class ProductsModule implements OnModuleInit {
  constructor(private readonly productService: ProductsService) {}

  async onModuleInit() {
    const countTotal = await this.productService.countTotal();
    if (!countTotal) {
      await this.productService.mockInitialData();
    }
  }
}
