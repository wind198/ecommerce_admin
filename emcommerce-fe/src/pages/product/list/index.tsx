import React from 'react';
import { Datagrid, DateField, EditButton, ImageField, List, NumberField, TextField } from 'react-admin';

export default function ProductList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="category.name" />
        <NumberField source="price" />
        <NumberField source="stock" />
        <NumberField source="itemSold" />

        <DateField source="createdAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
