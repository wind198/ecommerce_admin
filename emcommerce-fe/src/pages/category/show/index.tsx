import React from 'react';
import { DateField, ImageField, Show, SimpleShowLayout, TextField } from 'react-admin';

export default function CategoryShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <DateField source="createdAt" />
        <ImageField
          source="icon.src"
          label="Icon"
          emptyText="No icon"
          sx={{
            '.RaImageField-image': {
              width: 'auto',
              height: 'auto',
            },
          }}
        />
      </SimpleShowLayout>
    </Show>
  );
}
