import { Datagrid, DateField, List, NumberField, TextField } from 'react-admin';
import OrderDetail from '../show/order-detail';

export default function OrderList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <DateField source="createdAt" />
        <TextField source="customerFullName" />
        <TextField source="customer.email" />
        <TextField source="customer.phone" />
        <TextField source="customer.addess" />
        <NumberField
          source="totalBilling"
          options={{
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 1,
          }}
        />
        <NumberField source="totalItems" />
      </Datagrid>
    </List>
  );
}
