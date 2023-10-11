import React, { useContext, useMemo } from 'react';
import {
  DateInput,
  Edit,
  EditContext,
  ImageField,
  ImageInput,
  SimpleForm,
  TextField,
  TextInput,
  useEditController,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { ImageFieldForUpdate } from '../../category/edit';

export default function ProductEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextField label="Id" source="id" />
        <TextInput source="name" />

        {/* <DateInput source="createdAt" /> */}
        <ImageInput source="images" multiple label="Icon">
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
}
