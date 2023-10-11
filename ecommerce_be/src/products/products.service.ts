import { CategoryService } from './../category/category.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.schema';
import { Model, PipelineStage } from 'mongoose';
import { ListPagingSortingFilteringDto } from '../common/dtos/list-paging-sorting-filtering.dto';
import {
  generateMatchStageFromDataFilter,
  getRandomItem,
  remove1ImgFromDocument,
  removeSomeImgsFromDocument,
} from '../common/helper';
import { generateProductListMock } from '../common/mocks/product.mock';
import { difference } from 'lodash';
import { BasicApiService } from '../common/types/basic-api.service';

@Injectable()
export class ProductsService extends BasicApiService<Product, CreateProductDto, UpdateProductDto> {
  populatedPaths: string[] = ['category'];

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly categoryService: CategoryService,
  ) {
    super(productModel);
  }

  async findList(body: ListPagingSortingFilteringDto) {
    return super.findListPaging(body, [
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          as: 'category',
          foreignField: '_id',
        },
      },
      {
        $addFields: {
          category: {
            $arrayElemAt: ['$category', 0],
          },
        },
      },
    ]);
  }

  override async findOne(id: string, disablePopulatedPaths: string[] = []) {
    return super.findOne(id, difference(this.populatedPaths, disablePopulatedPaths));
  }

  async update(id: string, dto: UpdateProductDto, disablePopulatedPaths: string[] = []) {
    const match = await this.findOne(id);
    if (match) {
      await removeSomeImgsFromDocument([match], dto.images, (i) => i.images);
    }

    return super.update(id, dto, difference(this.populatedPaths, disablePopulatedPaths));
  }

  async delete(id: string, disablePopulatedPaths: string[] = []) {
    const match = await this.productModel.findById(id);
    await removeSomeImgsFromDocument([match], [], (i) => i.images);
    return super.delete(id, difference(this.populatedPaths, disablePopulatedPaths));
  }

  async updateMany(ids: string[], updateProductDto: UpdateProductDto, disablePopulatedPaths: string[] = []) {
    const { images: imagesToUpdate } = updateProductDto;
    const matches = await this.findMany(ids);
    if (matches.length) {
      await removeSomeImgsFromDocument(matches, imagesToUpdate, (i) => i.images);
    }

    return super.updateMany(ids, updateProductDto, difference(this.populatedPaths, disablePopulatedPaths));
  }

  async deleteMany(ids: string[]) {
    await this.productModel.deleteMany({ _id: { $in: ids } });
    return ids;
  }

  async mockInitialData() {
    const categoryList = await this.categoryService.findAll();
    if (!categoryList.length) {
      return;
    }
    const productListMock = generateProductListMock();
    const dtoList: CreateProductDto[] = productListMock.map((i) => {
      const randomCategory = getRandomItem(categoryList);
      return { ...i, category: randomCategory._id.toHexString() };
    });

    return await this.productModel.insertMany(dtoList);
  }

  countTotal() {
    return this.productModel.countDocuments();
  }
}
