import { IHasId, IHas_Id, IImage, ITimeStamp } from '../../common/types';
import { ICategory, ICategoryCoreFields } from '../category/types';

export type IProductCoreFields = {
  name: string;
  description: string;
  category: ICategoryCoreFields & IHas_Id;
  price: number;
  stock: number;
  itemSold: number;
  images: IImage[];
};

export type IProduct = IProductCoreFields & IHasId & ITimeStamp;

export type ICreateProduct = IProductCoreFields;
export type IUpdateProduct = Partial<IProductCoreFields>;
