import React, { useContext, useMemo } from 'react';
import {
  DateInput,
  Edit,
  EditContext,
  ImageField,
  ImageFieldProps,
  ImageInput,
  ImageInputProps,
  SimpleForm,
  TextField,
  TextInput,
  useEditController,
  useRecordContext,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';

export default function CategoryEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextField label="Id" source="id" />
        <TextInput source="name" />

        {/* <ImageInputForUpdate source="icon" label="Icon" /> */}
        {/* <DateInput source="createdAt" /> */}
        <ImageInput source="icon" label="Icon">
          {/* <ImageFieldForUpdate source="src" title="title" /> */}
          <ImageField
            sx={{
              img: {
                width: '40px !important',
                height: '40px !important',
                objectFit: 'cover',
                display: 'block',
              },
            }}
            source="src"
            title="title"
            emptyText="No icon"
          />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
}

export const ImageFieldForUpdate = (p: ImageFieldProps) => {
  const record = useRecordContext();

  console.log({ record });

  const { source, ...o } = p;

  const augmentedRecord = useMemo(() => {
    if (!source) {
      return record;
    }
    if (typeof record === 'string') {
      return { [source]: record };
    }
    return record;
  }, [record, source]);

  return (
    <ImageField
      sx={{
        '.RaImageField-image': {
          maxWidth: 40,
          maxHeight: 40,
        },
      }}
      record={augmentedRecord}
      {...p}
    />
  );
};
