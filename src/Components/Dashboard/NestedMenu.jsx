import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { supabase } from "../../database/supabase";

// Dummy data (3-level deep)
const dummyData = [
  { id: "1", name: "Categories", parent_id: null },
  { id: "2", name: "Test", parent_id: "1" },
  { id: "3", name: "Alpha", parent_id: "2" },
  { id: "4", name: "One", parent_id: "3" },
  { id: "5", name: "Two", parent_id: "3" },
  { id: "6", name: "Oxford", parent_id: "1" },
  { id: "7", name: "Deeper", parent_id: "2" },
  { id: "8", name: "More Deeper", parent_id: "7" },
  { id: "9", name: "Level 3", parent_id: "8" },
  { id: "10", name: "Level 3", parent_id: "8" },
];

// Utility: build tree from flat list
function buildTree(categories, parentId = null) {
  return categories
    .filter((cat) => cat.parent_id === parentId)
    .map((cat) => ({
      ...cat,
      children: buildTree(categories, String(cat.id)),
    }));
}

function CategoryItem({ category, onNavigate }) {
  const [open, setOpen] = useState(false);
  const hasChildren = category.children.length > 0;

  return (
    <li className="mb-1">
      <div
        className="flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
        onClick={() => {
          if (hasChildren) {
            setOpen(!open);
          } else {
            onNavigate(category.name);
          }
        }}
      >
        <span className="text-gray-800">{category.name}</span>
        {hasChildren &&
          (open ? (
            <ChevronDown size={16} className="text-gray-500" />
          ) : (
            <ChevronRight size={16} className="text-gray-500" />
          ))}
      </div>

      {hasChildren && open && (
        <ul className="ml-4 border-l border-gray-300 pl-2 mt-1">
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function NestedMenu() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const tree = buildTree(categories);
  // console.log(tree);

  const handleNavigate = (name) => {
    // navigate(`/products?category=${encodeURIComponent(name)}`);
  };

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

  return (
    <div className="max-w-sm mx-10 my-20  p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-3 text-gray-700">Categories</h2>
      <ul>
        {tree.map((cat) => (
          <CategoryItem
            key={cat.id}
            category={cat}
            onNavigate={handleNavigate}
          />
        ))}
      </ul>
    </div>
  );
}
