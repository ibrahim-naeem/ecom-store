import React from "react";
import { Outlet, useNavigate } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Navbar from "../Components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden text-textColor">
      <Navbar />
      <section className="">
        <h1 className="text-3xl font-bold pt-10 px-20">
          Welcome to, Dashboard
        </h1>
        <p className="py-5 px-20">You can manage your store here.</p>
        <div className="px-20 flex flex-wrap gap-5">
          <button
            onClick={() => navigate("/dashboard/add-category")}
            className="bg-gray-600 text-white rounded-full p-4"
          >
            Add a Category
          </button>
          <button
            onClick={() => navigate("/dashboard/add-product")}
            className="bg-gray-600 text-white rounded-full p-4"
          >
            Add a Product
          </button>
          <button
            onClick={() => navigate("/dashboard/manage-order")}
            className="bg-gray-600 text-white rounded-full p-4"
          >
            Manage Orders
          </button>
          <button
            onClick={() => navigate("/dashboard/manage-products")}
            className="bg-gray-600 text-white rounded-full p-4"
          >
            Manage Products
          </button>
          <button
            onClick={() => navigate("/")}
            className=" text-gray-500 border-2 rounded-full hover:bg-gray-600 hover:text-white  p-4"
          >
            Go to Website
          </button>
        </div>
        <div className="py-10 px-20">
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

// add categories
// add products
// manage orders
