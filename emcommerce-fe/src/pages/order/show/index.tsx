import { DateField, NumberField, Show, SimpleShowLayout, TextField } from 'react-admin';
import OrderDetail from './order-detail';

export default function OrderShow() {
  return (
    <Show>
      <SimpleShowLayout>
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
        <OrderDetail />
      </SimpleShowLayout>
    </Show>
  );
}
