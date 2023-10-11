import { differenceBy, isEmpty } from 'lodash';
import { IDataFilter, IDataFilterOperator } from '../types/data-filter';
import { Aggregate, FilterQuery, PipelineStage, Types } from 'mongoose';
import { IImage } from '../types/image';
import { unlink } from 'fs/promises';
import { NotFoundException } from '@nestjs/common';
import { basename, resolve } from 'path';

export const generateMatchStageFromDataFilter = (
  dataFilter: IDataFilter,
  dateFields: string[] = ['createdAt'],
  objectIdFields: string[] = [],
): PipelineStage.Match | undefined => {
  if (isEmpty(dataFilter)) {
    return;
  }
  const filterQuery = {} as FilterQuery<any>;
  for (const fieldName in dataFilter) {
    if (dateFields.includes(fieldName)) {
      const dateFilterObj = dataFilter[fieldName] as IDataFilterOperator;
      for (const dateFilterOpr in dateFilterObj) {
        const datefilterValue = dateFilterObj[dateFilterOpr];
        filterQuery[fieldName] = {
          ...(filterQuery[fieldName] ?? {}),
          [dateFilterOpr]: new Date(datefilterValue),
        };
      }
    } else if (objectIdFields.includes(fieldName)) {
      const dateFilterObj = dataFilter[fieldName] as IDataFilterOperator;
      for (const dateFilterOpr in dateFilterObj) {
        const datefilterValue = dateFilterObj[dateFilterOpr];
        filterQuery[fieldName] = {
          ...(filterQuery[fieldName] ?? {}),
          [dateFilterOpr]: new Types.ObjectId(datefilterValue),
        };
      }
    } else {
      filterQuery[fieldName] = dataFilter[fieldName] as IDataFilterOperator;
    }
  }
  const stage: PipelineStage = {
    $match: filterQuery,
  };

  return stage;
};

export const getRandomItem = <T>(list: T[]) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

const buildFullPathForAsset = (input: string, assetType: 'image') => {
  let assetFolder = 'images';
  switch (assetType) {
    case 'image':
      assetFolder = 'images';
      break;
    default:
      break;
  }

  const fileName = basename(input);
  return resolve(process.env.PUBLIC_PATH, assetFolder, fileName);
};

export const removeSomeImgsFromDocument = async <T>(
  documentList: T[],
  newImgList: IImage[] | undefined,
  documentImgSelector: (i: T) => IImage[],
) => {
  if (newImgList === undefined) {
    return;
  }
  const tobeRemovedImgList = [] as IImage[];
  documentList.forEach((doc) => {
    const images = documentImgSelector(doc);
    if (!images?.length) {
      return;
    }

    const removedImgs = differenceBy(images, newImgList, (i) => i.src);
    tobeRemovedImgList.push(...removedImgs);
  });

  const res = await Promise.allSettled(
    tobeRemovedImgList.map(({ src }) => unlink(buildFullPathForAsset(src, 'image'))),
  );
  for (const i of res) {
    if (i.status === 'rejected') {
      console.error(i.reason);
    }
  }
};

export const remove1ImgFromDocument = async <T>(documentList: T[], documentImgSelector: (i: T) => IImage) => {
  const tobeRemovedImgList = [] as IImage[];
  documentList.forEach((doc) => {
    const img = documentImgSelector(doc);
    if (!img) {
      return;
    }
    tobeRemovedImgList.push(img);
  });

  const res = await Promise.allSettled(
    tobeRemovedImgList.map(({ src }) => unlink(buildFullPathForAsset(src, 'image'))),
  );

  for (const i of res) {
    if (i.status === 'rejected') {
      console.error(i.reason);
    }
  }
};

export const throwNotFoundOrReturn = (output: any) => {
  if (!output) {
    throw new NotFoundException();
  }
  return output;
};
