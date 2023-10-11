import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICategoryCoreField } from '../entities/category.entity';
import { IImage, ImageDto } from '../../common/types/image';

export class CreateCategoryDto implements ICategoryCoreField {
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsOptional()
  icon?: ImageDto;

  @IsOptional()
  images?: ImageDto[];
}
