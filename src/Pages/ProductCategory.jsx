// src/Pages/ProductCategory.jsx
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { supabase } from "../database/supabase";

// import SortByName from "../Components/Filters/SortByName";
// import SortByPrice from "../Components/Filters/SortByPrice";

// import { motion } from "framer-motion";

function SortByName({ value, onChange }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 shadow-sm focus:outline-none cursor-pointer transition hover:bg-gray-200"
      >
        <option value="">Sort by Name</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
    </motion.div>
  );
}

function SortByPrice({ value, onChange }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="relative"
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 shadow-sm focus:outline-none cursor-pointer transition hover:bg-gray-200"
      >
        <option value="">Sort by Price</option>
        <option value="low-high">Low → High</option>
        <option value="high-low">High → Low</option>
      </select>
    </motion.div>
  );
}

export default function ProductCategory() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [sortByName, setSortByName] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");

  useEffect(() => {
    const getCategoryProducts = async (name) => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", name);

      if (error) console.error("Error fetching:", error.message);
      setProducts(data || []);
      setLoading(false);
    };
    getCategoryProducts(category);
  }, [category]);

  // filtering + sorting
  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (sortByName === "az") items.sort((a, b) => a.name.localeCompare(b.name));
    if (sortByName === "za") items.sort((a, b) => b.name.localeCompare(a.name));
    if (sortByPrice === "low-high") items.sort((a, b) => a.price - b.price);
    if (sortByPrice === "high-low") items.sort((a, b) => b.price - a.price);

    return items;
  }, [products, sortByName, sortByPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold mb-6">
        {category ? `Products in "${category}"` : "All Products"}
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <SortByName value={sortByName} onChange={setSortByName} />
        <SortByPrice value={sortByPrice} onChange={setSortByPrice} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
