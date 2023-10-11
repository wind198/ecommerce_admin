import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListPagingSortingFilteringDto } from '../common/dtos/list-paging-sorting-filtering.dto';
import { ManyIdsDto } from '../common/dtos/many-ids';
import { UpdateCategoryDto } from '../category/dto/update-category.dto';
import { IBasicRestController } from '../common/types/basic-rest-controller';
import { throwNotFoundOrReturn } from '../common/helper';

@Controller('product')
export class ProductsController implements IBasicRestController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createCategoryDto: CreateProductDto) {
    return this.productsService.create(createCategoryDto);
  }

  @Post('get-list')
  findList(@Body() bd: ListPagingSortingFilteringDto) {
    return this.productsService.findList(bd);
  }

  @Get('get-many')
  findMany(@Query() qr: ManyIdsDto) {
    return this.productsService.findMany(qr.ids);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return throwNotFoundOrReturn(await this.productsService.findOne(id));
  }

  @Patch('update-many')
  async updateMany(@Query() qr: ManyIdsDto, @Body() updateProductDto: UpdateProductDto) {
    return throwNotFoundOrReturn(await this.productsService.updateMany(qr.ids, updateProductDto));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return throwNotFoundOrReturn(await this.productsService.update(id, updateProductDto));
  }

  @Delete('delete-many')
  async deleteMany(@Query() qr: ManyIdsDto) {
    return throwNotFoundOrReturn(await this.productsService.deleteMany(qr.ids));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return throwNotFoundOrReturn(await this.productsService.delete(id));
  }
}
