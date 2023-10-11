import {
  Create,
  ImageInput,
  ImageField,
  SimpleForm,
  TextInput,
  SelectInput,
  useGetList,
  NumberInput,
  required,
  minValue,
} from 'react-admin';
import { Stack, InputAdornment } from '@mui/material';

export default function ProductCreate() {
  const { data: categoryChoices, isLoading: isLoadingCategories } = useGetList('category');

  return (
    <Create>
      <SimpleForm
        sx={{
          width: 600,
        }}
      >
        <TextInput fullWidth label="Name" source="name" validate={[required()]} />
        <TextInput
          rows={5}
          multiline
          maxRows={10}
          fullWidth
          label="Description"
          source="description"
          validate={[required()]}
        />
        <SelectInput
          fullWidth
          source="category"
          choices={categoryChoices}
          isLoading={isLoadingCategories}
          optionText={'name'}
          validate={[required()]}
        />
        <ImageInput multiple label="Images" source="images">
          <ImageField source="src" title="title" />
        </ImageInput>
        <NumberInput
          fullWidth
          source="price"
          validate={[required(), minValue(0)]}
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
        />

        <Stack width={1} direction={'row'} spacing={2} sx={{ '> *': { flex: 1 } }}>
          <NumberInput fullWidth source="stock" validate={[required(), minValue(0)]} />
          <NumberInput fullWidth source="itemSold" validate={[required(), minValue(0)]} />
        </Stack>
      </SimpleForm>
    </Create>
  );
}
