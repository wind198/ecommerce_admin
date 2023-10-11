import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { RestDataProvider } from './common/singletons/data-provider';
import CategoryList from './pages/category/list';
import CategoryShow from './pages/category/show';
import CategoryEdit from './pages/category/edit';
import CategoryCreate from './pages/category/create';
import ProductList from './pages/product/list';
import ProductEdit from './pages/product/edit';
import ProductShow from './pages/product/show';
import ProductCreate from './pages/product/create';
import OrderList from './pages/order/list';

export const App = () => (
  <Admin dataProvider={RestDataProvider}>
    <Resource
      recordRepresentation={'name'}
      hasCreate
      name="category"
      list={CategoryList}
      edit={CategoryEdit}
      show={CategoryShow}
      create={CategoryCreate}
    ></Resource>
    <Resource
      recordRepresentation={'name'}
      hasCreate
      name="product"
      list={ProductList}
      edit={ProductEdit}
      show={ProductShow}
      create={ProductCreate}
    ></Resource>
    <Resource
      recordRepresentation={'id'}
      name="order"
      list={OrderList}
    ></Resource>
  </Admin>
);
