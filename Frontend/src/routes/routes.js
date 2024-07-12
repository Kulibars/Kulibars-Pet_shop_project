import {
  AddProduct,
  AllCategories,
  Orders,
  OrdersProduct,
} from "../pages/administrator/components";
import {
  Main,
  Authorization,
  Reristration,
  Product,
  Basket,
  Administrator,
} from "../pages";
import { Error } from "../components";

export const adminRoute = [
  { path: "/admin", element: <Administrator /> },
  {
    path: "/admin/:id/edit",
    element: <AddProduct isEditing={false} key="2" />,
  },
  { path: "/admin/addProduct", element: <AddProduct isEditing={true} /> },
  { path: "/admin/categories", element: <AllCategories /> },
  { path: "/admin/orders", element: <Orders /> },
  { path: "/admin/orders/:id", element: <OrdersProduct /> },
];

export const guestRoute = [
  { path: "/", element: <Main /> },
  { path: "/login", element: <Authorization /> },
  { path: "/register", element: <Reristration /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/basket", element: <Basket /> },
  { path: "*", element: <Error error="404" /> },
];
