import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layouts/MainLayout";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import ProductDetail from "./Components/ProductDetail";
import AddProduct from "./Components/Dashboard/AddProduct";
import AddCategory from "./Components/Dashboard/AddCategory";
import ManageOrders from "./Components/Dashboard/ManageOrders";
import CartPage from "./Pages/CartPage";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./context/userContextProvider";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import PublicRoute from "./Routes/PublicRoutes";
import AdminRoute from "./Routes/AdminRoutes";
import ProductCategory from "./Pages/ProductCategory";
import ManageProducts from "./Components/Dashboard/ManageProducts";
import EditProduct from "./Components/Dashboard/EditProduct";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        Component: MainLayout,
        children: [
          { index: true, Component: Home },
          { path: "about", Component: About },
          { path: "productDetail/:id", Component: ProductDetail },
          { path: "cart", Component: CartPage },
          { path: "products", Component: ProductCategory },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
        children: [
          { path: "add-product", Component: AddProduct },
          { path: "add-category", Component: AddCategory },
          { path: "manage-order", Component: ManageOrders },
          { path: "manage-products", Component: ManageProducts },
          { path: "edit-product/:id", Component: EditProduct },
        ],
      },
    ],
  },
  { element: <PublicRoute />, children: [{ path: "login", Component: Login }] },
  { path: "*", element: <p>Page not found</p> },
]);
function App() {
  return (
    <>
      {" "}
      <UserContextProvider>
        {" "}
        <ToastContainer position="top" /> <RouterProvider router={router} />{" "}
      </UserContextProvider>{" "}
    </>
  );
}
export default App;
