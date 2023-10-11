import React, { forwardRef } from 'react';
import { useMemo } from 'react';
import { ForwardedRef } from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  ImageField,
  ImageFieldProps,
  List,
  TextField,
  useRecordContext,
} from 'react-admin';
import AugmentedImageField from '../../../components/AugmentedImageField';

export default function CategoryList() {
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="name" />
        <ImageField
          source="icon.src"
          label="Icon"
          sx={{
            '.RaImageField-image': {
              width: 'auto',
              height: 'auto',
              maxWidth: 40,
              maxHeight: 40,
            },
          }}
        />
        <DateField source="createdAt" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
