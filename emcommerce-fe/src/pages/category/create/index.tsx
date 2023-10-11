import React from 'react';
import { Create, ImageInput, ImageField, SimpleForm, TextInput } from 'react-admin';

export default function CategoryCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput label="Name" source="name" required />
        <ImageInput label="Icon" source="icon">
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput multiple label="Images" source="images">
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
}
