import { useNavigate } from "react-router";
import { supabase } from "../database/supabase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LatestProducts({ heading }) {
  const navigate = useNavigate();
  const [items, setitems] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        let { data: products, error } = await supabase
          .from("products")
          .select("*");

        setitems(products);

        if (error) {
          console.error("Error", error);
        }
      } catch (error) {
        console.error("Error ->", error);
      }
    };
    getAllProducts();
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-mainTheme">
            {heading ? heading : "Latest Products"}
          </h2>
          <p className="text-gray-600 mt-2 text-textColor">
            Discover our newest arrivals with exclusive discounts.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <motion.div
              whileTap={{ scale: 0.2 }}
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
            >
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />

                <span className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                  {item.discount} % OFF
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-gray-500 line-through">
                      {item.price}
                    </span>
                    <span className="text-green-600 font-bold">
                      {item.discountedPrice}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/productDetail/${item.id}`)}
                  className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105"
                >
                  View Product
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-gray-600 text-white rounded-xl shadow-md transition-all duration-500 hover:bg-gray-800 hover:scale-105">
          View All Products
        </button>
      </div>
    </section>
  );
}
