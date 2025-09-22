import { useEffect, useState } from "react";
import { supabase } from "../../database/supabase.js";
import NestedMenu from "./NestedMenu.jsx";
import { motion } from "motion/react";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch existing categories for dropdown
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, parent_id")
      .order("name", { ascending: true });

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    const { error } = await supabase.from("categories").insert([
      {
        name,
        parent_id: parentId || null, // null = main category
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      alert("Error adding category!");
    } else {
      alert("Category added!");
      setName("");
      setParentId(null);
      fetchCategories(); // refresh dropdown
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-10">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2"
            required
          />

          <select
            value={parentId || ""}
            onChange={(e) => setParentId(e.target.value || null)}
            className="border rounded p-2"
          >
            <option value="">No Parent (Main Category)</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-gray-600 text-white rounded p-2 hover:bg-gray-700"
          >
            Add Category
          </button>
        </form>
      </div>
      <NestedMenu />
    </motion.div>
  );
}
