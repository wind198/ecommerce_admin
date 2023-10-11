import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  Identifier,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
  withLifecycleCallbacks,
} from 'react-admin';
import { axiosClient } from '../axios';
import {
  convertMongoIdToId,
  convertObjectUrlToArrayBuffer,
  fetchBlobFromURL,
  mapMongoIdToId,
  subtract2List,
} from '../../helpers';
import { CategoryLifecycle } from './lifecycles/category';
import { ProductLifecycle } from './lifecycles/product';

export const RestDataProvider: DataProvider = withLifecycleCallbacks(
  {
    getList: async function <RecordType extends RaRecord<Identifier> = any>(
      resource: string,
      params: GetListParams,
    ): Promise<GetListResult<RecordType>> {
      const { filter, pagination, sort } = params;
      const {
        data: { data, ...o },
      } = await axiosClient.post([resource, 'get-list'].join('/'), { filter, pagination, sort });
      return { ...o, data: mapMongoIdToId(data) };
    },
    getOne: async function <RecordType extends RaRecord<Identifier> = any>(
      resource: string,
      params: GetOneParams<RecordType>,
    ): Promise<GetOneResult<RecordType>> {
      const { data } = await axiosClient.get(`${resource}/${params.id}`);
      return { data: convertMongoIdToId(data) };
    },
    getMany: async function <RecordType extends RaRecord<Identifier> = any>(
      resource: string,
      params: GetManyParams,
    ): Promise<GetManyResult<RecordType>> {
      const { data } = await axiosClient.get([resource, 'get-many'].join('/'), {
        params: { ids: params.ids.join(',') },
      });
      return { data: mapMongoIdToId(data) as any };
    },
    getManyReference: async function <RecordType extends RaRecord<Identifier> = any>(
      resource: string,
      params: GetManyReferenceParams,
    ): Promise<GetManyReferenceResult<RecordType>> {
      const { filter, pagination, sort, id, target } = params;
      const {
        data: { data, ...o },
      } = await axiosClient.post([resource, 'get-list'].join('/'), {
        pagination,
        sort,
        filter: { ...filter, [target]: { $eq: id } },
      });

      return { ...o, data: mapMongoIdToId(data) };
    },
    update: async function <RecordType extends RaRecord<Identifier> = any>(
      resource: string,
      params: UpdateParams<any>,
    ): Promise<UpdateResult<RecordType>> {
      const { data } = await axiosClient.patch([resource, params.id].join('/'), params.data);
      return { data: convertMongoIdToId(data) };
    },
    updateMany: async function <RecordType extends RaRecord<Identifier> = any>(
      resource: string,
      params: UpdateManyParams<any>,
    ): Promise<UpdateManyResult<RecordType>> {
      const { data } = await axiosClient.patch([resource, 'update-many'].join('/'), params.data, {
        params: { ids: params.ids },
      });
      return { data: mapMongoIdToId(data) as any };
    },
    create: async function <
      RecordType extends Omit<RaRecord<Identifier>, 'id'> = any,
      ResultRecordType extends RaRecord<Identifier> = RecordType & { id: Identifier },
    >(resource: string, params: CreateParams<any>): Promise<CreateResult<ResultRecordType>> {
      const { data } = await axiosClient.post(resource, params.data);
      return { data: convertMongoIdToId(data) };
    },
    delete: async function <RecordType extends RaRecord<Identifier> = any>(
      resource: string,
      params: DeleteParams<RecordType>,
    ): Promise<DeleteResult<RecordType>> {
      const { data } = await axiosClient.delete([resource, params.id].join('/'));
      return { data: convertMongoIdToId(data) };
    },
    deleteMany: async function <RecordType extends RaRecord<Identifier> = any>(
      resource: string,
      params: DeleteManyParams<RecordType>,
    ): Promise<DeleteManyResult<RecordType>> {
      const { data } = await axiosClient.delete([resource, 'delete-many'].join('/'), {
        params: { ids: params.ids.join(',') },
      });
      return { data };
    },
  },
  [CategoryLifecycle, ProductLifecycle],
);
