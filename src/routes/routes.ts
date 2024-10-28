import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProductExchange from "../pages/ProductExchange/ProductExchange";

export const publicRoutes = [
  {
    path: "/home",
    component: Home,
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
];
