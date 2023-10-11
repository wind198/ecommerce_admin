export const SortOrderList = ['ASC', 'DESC'] as const;

export type ISortOrder = (typeof SortOrderList)[number];

export interface IDataSorting {
  field: string;
  order: ISortOrder;
}
