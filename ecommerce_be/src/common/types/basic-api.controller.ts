import { ManyIdsDto } from '../dtos/many-ids';
import { ListPagingSortingFilteringDto } from './../dtos/list-paging-sorting-filtering.dto';
export type IBasicController<TCreateDto, TUpdateDto> = {
  create: (dto: TCreateDto) => any;

  findListPaging: (dto: ListPagingSortingFilteringDto) => any;

  findMany: (qr: ManyIdsDto) => any;

  findOne: (id: string) => any;

  findAll: () => any;

  updateMany: (qr: ManyIdsDto, dto: TUpdateDto) => any;

  update: (id: string, dto: TUpdateDto) => any;

  deleteMany: (qr: ManyIdsDto) => any;

  delete: (id: string) => any;
};
