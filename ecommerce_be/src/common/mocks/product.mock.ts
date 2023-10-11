import { CreateProductDto } from '../../products/dto/create-product.dto';
import { faker } from '@faker-js/faker';

export const generateProductListMock = (): Omit<CreateProductDto, 'category'>[] => {
  return Array(10)
    .fill(0)
    .map(() => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      itemSold: faker.number.int({ min: 0, max: 1000 }),
      stock: faker.number.int({ min: 0, max: 10000 }),
      price: faker.number.int({ min: 0, max: 2000 }),
      images: [],
    }));
};
