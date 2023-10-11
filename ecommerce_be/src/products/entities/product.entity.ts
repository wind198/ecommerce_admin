import { Category } from '../../category/entities/category.schema';
import { IImage } from '../../common/types/image';

export interface IProductCoreField {
  name: string;
  description: string;
  category: Category;
  price: number;
  stock: number;
  itemSold: number;
  images: IImage[];
}
