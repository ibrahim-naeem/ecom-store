import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialCart = [
  {
    id: 1,
    name: "Nike Air Zoom Pegasus 40",
    price: 120,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1606813902910-5c58b48a9c9f?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    price: 150,
    qty: 2,
    image:
      "https://images.unsplash.com/photo-1606814208586-3c9b4e4d5ec2?auto=format&fit=crop&w=500&q=80",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const increment = (id) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10">
      <div className="mx-4 lg:mx-[150px] flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-5 mb-5 flex items-center gap-6 hover:shadow-xl transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover shadow"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-500">${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decrement(item.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 text-xl hover:bg-gray-200 transition"
                  >
                    -
                  </button>

                  <motion.span
                    key={item.qty}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 text-center font-semibold text-gray-800"
                  >
                    {item.qty}
                  </motion.span>

                  <button
                    onClick={() => increment(item.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white text-xl hover:bg-gray-700 transition"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <motion.div
          layout
          className="lg:w-1/3 bg-white rounded-2xl shadow-2xl p-8 h-fit sticky top-6 border border-gray-100"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Order Summary
          </h2>
          <div className="flex justify-between mb-3 text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-700">
            <span>Shipping</span>
            <span className="font-semibold">Free</span>
          </div>
          <div className="flex justify-between text-xl font-bold mb-8 text-gray-900">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button className="w-full rounded-xl py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-black transition">
            Proceed to Checkout
          </button>
        </motion.div>
      </div>
    </div>
  );
}
