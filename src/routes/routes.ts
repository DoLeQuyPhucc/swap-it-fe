import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProductExchange from "../pages/ProductExchange/ProductExchange";
import Transaction from "../pages/Transaction/Transaction";
import CreateProduct from "../pages/Product/CreateProduct";
import MyProduct from "../pages/Product/MyProduct";

export const publicRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/transactions",
    component: Transaction,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/product-detail/:productId",
    component: ProductDetail,
  },
  {
    path: "/request-exchange/:productId",
    component: ProductExchange,
  },
  {
    path: "products/myProduct",
    component: MyProduct,
  },
  {
    path: "products/create",
    component: CreateProduct,
  }
];
