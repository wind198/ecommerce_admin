import { INumberString } from './number-string';
export const FilterOperatorList = ['$eq', '$gt', '$lt', '$gte', '$lte'] as const;

export type IFilterOperator = (typeof FilterOperatorList)[number];

export type IDataFilterOperator = Record<IFilterOperator, INumberString>;

export type IDataFilter = Record<string, IDataFilterOperator>;
