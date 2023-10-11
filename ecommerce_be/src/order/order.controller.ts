import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IBasicController } from '../common/types/basic-api.controller';
import { ListPagingSortingFilteringDto } from '../common/dtos/list-paging-sorting-filtering.dto';
import { ManyIdsDto } from '../common/dtos/many-ids';
import { throwNotFoundOrReturn } from '../common/helper';

@Controller('order')
export class OrderController implements IBasicController<CreateOrderDto, UpdateOrderDto> {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Post('get-list') findListPaging(@Body() dto: ListPagingSortingFilteringDto) {
    return this.orderService.findListPaging(dto);
  }

  @Get('get-many')
  findMany(@Query() qr: ManyIdsDto) {
    return this.orderService.findMany(qr.ids);
  }

  @Get(':id') async findOne(@Param('id') id: string) {
    return throwNotFoundOrReturn(await this.orderService.findOne(id));
  }

  @Get() findAll() {
    return this.orderService.findAll();
  }

  @Patch('update-many') async updateMany(@Query() qr: ManyIdsDto, @Body() dto: UpdateOrderDto) {
    return throwNotFoundOrReturn(await this.orderService.updateMany(qr.ids, dto));
  }

  @Patch(':id') async update(id: string, dto: UpdateOrderDto) {
    return throwNotFoundOrReturn(await this.orderService.update(id, dto));
  }

  @Delete(':id') async delete(id: string) {
    return throwNotFoundOrReturn(await this.orderService.delete(id));
  }

  @Delete('delete-many') async deleteMany(qr: ManyIdsDto) {
    return throwNotFoundOrReturn(await this.orderService.deleteMany(qr.ids));
  }
}
