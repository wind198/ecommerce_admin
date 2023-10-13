import { Model, PipelineStage } from 'mongoose';
import { ListPagingSortingFilteringDto } from '../dtos/list-paging-sorting-filtering.dto';
import { generateMatchStageFromDataFilter } from '../helper';
import { Logger } from '@nestjs/common';

export class BasicApiService<T, TCreateDto, TUpdateDto> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  findOne(id: string, populatePaths: string[] = []) {
    return this.model.findById(id, undefined, { lean: true }).populate(populatePaths).exec();
  }

  findMany(ids: string[], populatePaths: string[] = []) {
    return this.model.find({ _id: ids }, undefined, { lean: true }).populate(populatePaths).exec();
  }

  update(id: string, dto: TUpdateDto, populatePaths: string[] = []) {
    return this.model.findByIdAndUpdate(id, dto, { lean: true, new: true }).populate(populatePaths).exec();
  }

  updateMany(ids: string[], dto: TUpdateDto, populatePaths: string[] = []) {
    return this.model.updateMany({ _id: ids }, dto, { lean: true, new: true }).populate(populatePaths).exec();
  }

  delete(id: string, populatePaths: string[] = []) {
    return this.model.findOneAndDelete({ _id: id }).populate(populatePaths).exec();
  }

  async deleteMany(ids: string[]) {
    const res = await this.model.deleteMany({ _id: ids });
    if (!res.deletedCount) {
      return null;
    }
    return ids;
  }

  async create(dto: TCreateDto) {
    return await this.model.create(dto);
  }

  async findListPaging(body: ListPagingSortingFilteringDto, additionalPipelineStages: PipelineStage[] = []) {
    const { pagination, sort, filter } = body;
    let { field = 'createdAt' } = sort ?? {};
    const { order = 'ASC' } = sort ?? {};
    if (field === 'id') {
      field = '_id';
    }

    const { page, perPage } = pagination;

    const pipeline: PipelineStage[] = [];
    const matchFilterStage = generateMatchStageFromDataFilter(filter);
    if (matchFilterStage) {
      pipeline.push(matchFilterStage);
    }
    pipeline.push(
      {
        $sort: {
          [field]: order === 'ASC' ? 1 : -1,
        },
      },
      { $skip: perPage * (page - 1) },
      { $limit: perPage },
    );
    pipeline.push(...additionalPipelineStages);
    const [data, countTotal] = await Promise.all([this.model.aggregate(pipeline).exec(), this.countTotal()]);
    return {
      data,
      total: countTotal,
      pageInfo: {
        hasNextPage: countTotal > perPage * page,
        hasPreviousPage: perPage > 1,
      },
    };
  }

  findAll(populatePaths: string[] = []) {
    return this.model.find({}, undefined, { lean: true }).populate(populatePaths).exec();
  }

  async countTotal() {
    return await this.model.countDocuments().exec();
  }
}
