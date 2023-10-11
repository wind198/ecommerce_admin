import { ManyIdsDto } from '../dtos/many-ids';
import { ListPagingSortingFilteringDto } from './../dtos/list-paging-sorting-filtering.dto';
export interface IBasicRestController {
  create(payload: any): any;
  findList?(bd: ListPagingSortingFilteringDto): any;
  findAll?(): any;
  findMany(qr: ManyIdsDto): any;
  findOne(id: string): any;
  update(id: string, bd: any): any;
  updateMany(qr: ManyIdsDto, bd: any): any;
  delete(id: string): any;
  deleteMany(qr: ManyIdsDto): any;
}
