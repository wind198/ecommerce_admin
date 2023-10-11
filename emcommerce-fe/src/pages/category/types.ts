import { IHasId, IImage, ITimeStamp } from '../../common/types';

export type ICategoryCoreFields = {
  name: string;
  icon?: IImage;
  images?: IImage[];
};

export type ICategory = ICategoryCoreFields & IHasId & ITimeStamp;

export type ICreateCategory = ICategoryCoreFields;
export type IUpdateCategory = Partial<ICategoryCoreFields>;
