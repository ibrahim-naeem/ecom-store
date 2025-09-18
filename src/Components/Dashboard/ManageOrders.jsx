import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dummyOrders = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    date: "2025-09-18",
    status: "Pending",
    total: 240.5,
  },
  {
    id: "ORD-1002",
    customer: "Emily Smith",
    date: "2025-09-17",
    status: "Shipped",
    total: 150.0,
  },
  {
    id: "ORD-1003",
    customer: "Michael Brown",
    date: "2025-09-15",
    status: "Delivered",
    total: 320.75,
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function ManageOrders() {
  const [orders, setOrders] = useState(dummyOrders);

  const handleAction = (id, action) => {
    alert(`Order ${id} → ${action}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen  py-10" //bg-gradient-to-b from-gray-50 to-gray-100
    >
      <div className="mx-4 ">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Orders</h1>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-2xl shadow-lg bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Order ID
                </th>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Customer
                </th>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Date
                </th>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Status
                </th>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Total
                </th>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence component="tbody">
                {orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleAction(order.id, "View")}
                        className="px-3 py-1 rounded-lg bg-gray-500 text-white text-sm hover:bg-gray-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleAction(order.id, "Cancel")}
                        className="px-3 py-1 rounded-lg  text-gray-700 text-sm transition"
                      >
                        Cancel
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-lg rounded-2xl p-5"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-bold text-lg">{order.id}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold">Customer:</span>{" "}
                  {order.customer}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Date:</span> {order.date}
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-semibold">Total:</span> $
                  {order.total.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(order.id, "View")}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm hover:bg-gray-700 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleAction(order.id, "Cancel")}
                    className="flex-1 px-3 py-2 rounded-lg  text-gray-700 text-sm transition"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
