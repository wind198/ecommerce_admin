import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { IProductCoreField } from '../entities/product.entity';
import { IImage } from '../../common/types/image';

export class CreateProductDto implements Omit<IProductCoreField, 'category'> {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsMongoId()
  category: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(0)
  itemSold: number;

  @IsOptional()
  images: IImage[];
}
