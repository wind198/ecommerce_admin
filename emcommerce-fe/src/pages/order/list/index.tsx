import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  TextInput,
  FilterForm,
  FilterButton,
  CreateButton,
} from 'react-admin';
import { Stack } from '@mui/material';

export default function OrderList() {
  const postFilters = [
    <TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
  ];

  const ListToolbar = () => (
    <Stack direction="row" justifyContent="space-between">
      <FilterForm filters={postFilters} />
      <div>
        <FilterButton filters={postFilters} />
      </div>
    </Stack>
  );
  return (
    <List>
      <ListToolbar />
      <Datagrid>
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
