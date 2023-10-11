import { IDataFilter, IDataFilterOperator } from '../types/data-filter';
import { IsEnum, IsJSON, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IDataPaging } from '../types/data-paging';
import { IDataSorting, ISortOrder, SortOrderList } from '../types/data-sorting';
import { IsDataFilter } from '../decorator/class-validator/is-data-filter';

class DataPaging implements IDataPaging {
  @IsNumber()
  @Min(0)
  page: number;

  @IsNumber()
  @Min(0)
  perPage: number;
}

class DataSorting implements IDataSorting {
  @IsString()
  field: string;

  @IsEnum(SortOrderList)
  order: ISortOrder;
}

export class ListPagingSortingFilteringDto {
  @ValidateNested({})
  @Type(() => DataPaging)
  pagination: DataPaging;

  @IsOptional()
  @ValidateNested({})
  @Type(() => DataSorting)
  sort: DataSorting;

  @IsOptional()
  @IsDataFilter()
  filter: IDataFilter;
}
