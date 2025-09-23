import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../database/supabase.js";
import { useNavigate } from "react-router";

export default function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const fetchCategores = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    setCategories(data);
    if (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    } else {
      setLoading(false);
      setProducts(data);
    }
  };

  const fetchProductsByCategores = async (name) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", name);

    if (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    } else {
      setLoading(false);
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchCategores();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      fetchProducts();
    } else {
      fetchProductsByCategores(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen  py-10" //bg-gradient-to-b from-gray-50 to-gray-100
    >
      <div className="">
        <div>
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Manage Products - {selectedCategory}
          </h1>
          <select
            onClick={(e) => setSelectedCategory(e.target.value)}
            className="mb-4 p-2 border rounded-lg"
          >
            <option value="all">All categories</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-2xl shadow-lg bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Name
                </th>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Price
                </th>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Discount
                </th>

                <th className="p-4 text-left text-gray-600 font-semibold">
                  Description
                </th>

                <th className="p-4 text-left text-gray-600 font-semibold">
                  Category
                </th>
                <th className="p-4 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence component="tbody">
                {loading ? (
                  <tr>
                    <td className="flex justify-center items-center">
                      <div className="w-8 h-8 mx-auto border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    </td>
                  </tr>
                ) : (
                  <>
                    {products.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="p-4 text-center text-gray-500"
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                    {products.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="bproduct-b last:bproduct-none hover:bg-gray-50 transition"
                      >
                        <td className="p-4 font-medium">{product.name}</td>
                        <td className="p-4">{product.price}</td>
                        <td className="p-4">{product.discount}%</td>
                        <td className="p-4 font-semibold">
                          {product.description}
                        </td>
                        <td className="p-4 font-semibold">
                          {product.category}
                        </td>
                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() => handleEdit(product.id)}
                            className="px-3 py-1 rounded-lg bg-gray-500 text-white text-sm hover:bg-gray-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 rounded-lg  text-red-700 text-sm transition"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className="md:hidden  w-[70vw] space-y-6">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className=" bg-white shadow-lg rounded-2xl p-5"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-bold text-lg">{product.name}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold `}
                  >
                    {product.status}
                  </span>
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold"></span> {product.price}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold"></span> {product.discount}%
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-semibold">{product.description}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-600 text-white text-sm hover:bg-gray-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 px-3 py-2 rounded-lg  text-red-700 text-sm transition"
                  >
                    Delete
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
