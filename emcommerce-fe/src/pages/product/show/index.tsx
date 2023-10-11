import React from 'react';
import { DateField, ImageField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';

export default function ProductShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="category.name" />
        <DateField source="createdAt" />
        <ImageField
          source="images"
          src="src"
          label="Images"
          sx={{
            '.RaImageField-image': {
              maxWidth: 200,
              maxHeight: 200,
            },
          }}
          emptyText="No images"
        />
      </SimpleShowLayout>
    </Show>
  );
}
