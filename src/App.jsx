import { createBrowserRouter, useNavigate } from "react-router";
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
import { useContext, useEffect, useState } from "react";
import { supabase } from "./database/supabase";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./context/userContextProvider";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import PublicRoute from "./Routes/PublicRoutes";
import AdminRoute from "./Routes/AdminRoutes";
import { UserContext } from "./context/userContext";
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
