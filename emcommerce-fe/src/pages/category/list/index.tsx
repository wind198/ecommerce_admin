import { Datagrid, DateField, EditButton, ImageField, List, TextField, TextInput } from 'react-admin';

const categoryFilters = [<TextInput alwaysOn={true} label="Name" key={'name'} source="name"></TextInput>];

export default function CategoryList() {
  return (
    <List filters={categoryFilters}>
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
