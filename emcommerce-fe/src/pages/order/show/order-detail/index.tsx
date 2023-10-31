import { Datagrid, List, ListBase, NumberField, SimpleList, TextField, useRecordContext } from 'react-admin';
import { IOrder } from '../../types';
import { useMemo } from 'react';
import { convertMongoIdToId } from '../../../../common/helpers';

export default function OrderDetail() {
  const { products } = useRecordContext<IOrder>();

  const productsAugmented = useMemo(() => products.map(convertMongoIdToId), [products]);

  return (
    <ListBase>
      <Datagrid bulkActionButtons={false} data={productsAugmented} isRowSelectable={() => false}>
        <TextField source="productId"></TextField>
        <TextField source="name"></TextField>
        <NumberField source="quantity"></NumberField>
        <NumberField source="price"></NumberField>
      </Datagrid>
    </ListBase>
  );
}
