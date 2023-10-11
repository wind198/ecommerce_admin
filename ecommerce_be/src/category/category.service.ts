import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { Category } from './entities/category.schema';
import { remove1ImgFromDocument, removeSomeImgsFromDocument } from '../common/helper';
import { CategoryListMock } from '../common/mocks/category.mock';
import { BasicApiService } from '../common/types/basic-api.service';

@Injectable()
export class CategoryService extends BasicApiService<Category, CreateCategoryDto, UpdateCategoryDto> {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {
    super(categoryModel);
  }

  override async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const matchDoc = await this.findOne(id);
    if (!matchDoc) {
      return null;
    }
    const { icon, images } = updateCategoryDto;
    if (icon || updateCategoryDto.removeIcon) {
      await remove1ImgFromDocument([matchDoc], (i) => i.icon);
    }
    await removeSomeImgsFromDocument([matchDoc], images, (i) => i.images);

    return super.update(id, updateCategoryDto);
  }

  override async updateMany(ids: string[], updateCategoryDto: UpdateCategoryDto) {
    const { icon, images, removeIcon } = updateCategoryDto;
    const matches = await this.findMany(ids);
    if (matches.length) {
      if (icon || removeIcon) {
        await remove1ImgFromDocument(matches, (i) => i.icon);
      }
      await removeSomeImgsFromDocument(matches, images, (i) => i.images);
    }

    return super.updateMany(ids, updateCategoryDto);
  }

  override async delete(id: string) {
    const match = await this.categoryModel.findById(id);
    await removeSomeImgsFromDocument([match], [], (i: any) => [...i.images, i.icon]);
    return super.delete(id);
  }

  override async deleteMany(ids: string[]) {
    const matches = await this.findMany(ids);

    await removeSomeImgsFromDocument(matches, [], (i) => [...i.images, i.icon]);
    return super.deleteMany(ids);
  }

  mockInitialData() {
    return this.categoryModel.insertMany(CategoryListMock);
  }

  countTotal() {
    return this.categoryModel.countDocuments();
  }
}
