import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ListPagingSortingFilteringDto } from '../common/dtos/list-paging-sorting-filtering.dto';
import { ManyIdsDto } from '../common/dtos/many-ids';
import { IBasicRestController } from '../common/types/basic-rest-controller';
import { throwNotFoundOrReturn } from '../common/helper';

@Controller('category')
export class CategoryController implements IBasicRestController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post('get-list')
  findList(@Body() bd: ListPagingSortingFilteringDto) {
    return this.categoryService.findListPaging(bd);
  }

  @Get('get-many')
  findMany(@Query() qr: ManyIdsDto) {
    return this.categoryService.findMany(qr.ids);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return throwNotFoundOrReturn(await this.categoryService.findOne(id));
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Patch('update-many')
  async updateMany(qr: ManyIdsDto, bd: UpdateCategoryDto) {
    return throwNotFoundOrReturn(await this.categoryService.updateMany(qr.ids, bd));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return throwNotFoundOrReturn(await this.categoryService.update(id, updateCategoryDto));
  }

  @Delete('delete-many')
  async deleteMany(qr: ManyIdsDto) {
    return throwNotFoundOrReturn(await this.categoryService.deleteMany(qr.ids));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return throwNotFoundOrReturn(await this.categoryService.delete(id));
  }
}
