import React from "react";
import { Outlet, useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <section className="">
      <h1 className="text-3xl font-bold pt-10 px-20">Welcome to, Dashboard</h1>
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
      </div>
      <div className="py-10 px-20">
        <Outlet />
      </div>
    </section>
  );
}

export default Dashboard;

// add categories
// add products
// manage orders
