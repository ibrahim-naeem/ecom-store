import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import MainLayout from "./Layouts/MainLayout";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import ProductDetail from "./Components/ProductDetail";

import AddProduct from "./Components/Dashboard/AddProduct";
import AddCategory from "./Components/Dashboard/AddCategory";
import ManageOrders from "./Components/Dashboard/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "dashboard",
        Component: Dashboard,
        children: [
          { path: "add-product", Component: AddProduct },
          { path: "add-category", Component: AddCategory },
          { path: "manage-order", Component: ManageOrders },
        ],
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "productDetail",
        Component: ProductDetail,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
