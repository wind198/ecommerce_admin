import {
  Datagrid,
  DateField,
  EditButton,
  List,
  ListContextProvider,
  NumberField,
  TextField,
  useListContext,
  useListController,
  useListFilterContext,
} from 'react-admin';
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  CardActions,
  TextField as MuiTextField,
  Card,
  CardContent,
  CardHeader,
  Box,
  Slider,
  Stack,
  Checkbox,
  FormGroup,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import MuiNumberInput from '../../../components/MulInputNumber';
import { INumberString } from '../../../common/types';

type IProductFilterFormData = {
  name: string;
  price: [number, number];
};

const MaxPriceFilterValue = 1e6;

const mapPriceFromUrlSearchParamsToFilter = (priceFilterString: string) => {
  const [from, to] = priceFilterString.split(',');
  return { from: from || undefined, to: to || undefined };
};

const ProductListFilterPanel = () => {
  const { setFilters, filterValues } = useListContext();

  const formDefaultValues: IProductFilterFormData = useMemo(
    () => ({
      name: filterValues.name ?? '',
      price: filterValues.price?.split(',') ?? [0, MaxPriceFilterValue],
    }),
    [filterValues.name, filterValues.price],
  );

  const { register, handleSubmit, control, reset } = useForm<IProductFilterFormData>({
    defaultValues: formDefaultValues,
  });

  const [unlimitPrice, setUnlimitPrice] = useState(() => {
    const { from, to } = mapPriceFromUrlSearchParamsToFilter(filterValues.price ?? '');
    return { from: !from, to: !to };
  });

  const onSubmit = useCallback(() => {
    handleSubmit((data) => {
      const { name, price } = data;
      const newFilters: Record<string, INumberString> = {};
      const shownFilters = [] as string[];
      if (name) {
        newFilters['name'] = name;
        shownFilters.push('name');
      }
      if (!unlimitPrice.from || !unlimitPrice.to) {
        const [from, to] = price;
        if (!!from || !!to) {
          newFilters.price = [!unlimitPrice.from ? from || '' : '', !unlimitPrice.to ? to || '' : ''].join(',');
          shownFilters.push('price');
        }
      }
      setFilters(newFilters, shownFilters);
    })();
  }, [handleSubmit, setFilters, unlimitPrice]);

  return (
    <Card
      sx={{
        height: '100vh',
      }}
    >
      <CardHeader title="Filters"></CardHeader>
      <Box
        onSubmit={(e: FormEvent<HTMLDivElement>) => {
          e.preventDefault();
          onSubmit();
        }}
        component="form"
      >
        <CardContent>
          <Stack spacing={3}>
            <MuiTextField fullWidth label="Name" {...register('name')} />

            <FormGroup>
              <FormLabel>Price</FormLabel>
              <Stack>
                {['from', 'to'].map((key, i) => (
                  <Controller
                    key={key}
                    control={control}
                    name={`price.${i as 0 | 1}`}
                    render={({ field: { value, onChange } }) => {
                      console.log({ value });
                      return (
                        <Stack>
                          <MuiNumberInput
                            disabled={unlimitPrice[i ? 'to' : 'from']}
                            // disableNegative
                            sx={{
                              ' .MuiFormLabel-root': {
                                textTransform: 'capitalize',
                              },
                            }}
                            label={key}
                            value={value}
                            onChange={onChange}
                          />
                          <FormControlLabel
                            label="Unlimited"
                            control={
                              <Checkbox
                                checked={unlimitPrice[i ? 'to' : 'from']}
                                onChange={(_, v) => setUnlimitPrice((p) => ({ ...p, [i ? 'to' : 'from']: v }))}
                              />
                            }
                          ></FormControlLabel>
                        </Stack>
                      );
                    }}
                  />
                ))}
              </Stack>
            </FormGroup>
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            position: 'sticky',
            bottom: 0,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button onClick={() => reset()} variant="contained" color="inherit">
            Reset
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Apply
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default function ProductList() {
  return (
    <List aside={<ProductListFilterPanel />}>
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
