import React from 'react';
import { DateField, ImageField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';
import AugmentedImageField from '../../../components/AugmentedImageField';

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
