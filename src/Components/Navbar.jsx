import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { supabase } from "../database/supabase";
import { UserContext } from "../context/userContext";

// Build tree from flat categories
function buildTree(categories, parentId = null) {
  return categories
    .filter((cat) => cat.parent_id === parentId)
    .map((cat) => ({
      ...cat,
      children: buildTree(categories, String(cat.id)),
    }));
}

const SlideMenu = ({ children, isOpen, zIndex, top }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`bg-white w-[80vw] h-[100vh] fixed flex flex-col right-0 ${top} ${zIndex} shadow-2xl text-gray-500`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Recursive renderer
function CategoryMenu({ items, onBack, onSelectCategory }) {
  const [active, setActive] = useState(null);

  return (
    <ul className="p-5">
      {onBack && (
        <ArrowLeft
          onClick={onBack}
          className="ml-auto mr-6 mb-4 cursor-pointer"
        />
      )}
      {items.map((item) => (
        <li
          key={item.id}
          className="p-4 shadow-lg rounded-full flex items-center justify-between cursor-pointer"
          onClick={() => {
            if (!item.children?.length) {
              onSelectCategory(item.name);
            }
          }}
        >
          <span>{item.name}</span>
          {item.children?.length > 0 && (
            <ChevronRight onClick={() => setActive(item)} />
          )}

          {/* Render children as SlideMenu */}
          <SlideMenu isOpen={active?.id === item.id} zIndex="z-40" top="top-16">
            <CategoryMenu
              items={item.children}
              onBack={() => setActive(null)}
              onSelectCategory={onSelectCategory}
            />
          </SlideMenu>
        </li>
      ))}
    </ul>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { admin } = useContext(UserContext);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const tree = buildTree(categories);

  const handleCategory = (name) => {
    navigate(`products?category=${name}`);
    setOpen(false);
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error("Error signing out:", error.message);
      navigate("/login");
    } catch (err) {
      console.error("Unexpected signOut error:", err);
    }
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
    <div className="w-full z-50">
      <div className="flex justify-between items-center px-20 py-5 bg-gray-600 text-white font-bold">
        <button onClick={() => navigate("/")}>ECOM STORE</button>
        <button className="right-0 md:hidden" onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Navigation */}
      <SlideMenu isOpen={open} setIsOpen={setOpen} top="top-0">
        <div className="flex justify-between items-center p-5 bg-gray-600 text-white">
          <span>LOGO</span>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>
        <ul className="p-5 z-20 flex flex-col gap-4">
          {admin && (
            <li
              className="p-4 shadow-lg rounded-full cursor-pointer"
              onClick={() => {
                navigate("/dashboard");
                setOpen(false);
              }}
            >
              Go to Dashboard
            </li>
          )}
          <li
            className="p-4 shadow-lg rounded-full flex items-center justify-between cursor-pointer"
            onClick={() => setCategoriesOpen(true)}
          >
            <span>Shoes</span>
            <ChevronRight />
          </li>

          {/* Categories SubMenu */}
          <SlideMenu isOpen={categoriesOpen} zIndex="z-30" top="top-16">
            <CategoryMenu
              items={tree}
              onBack={() => setCategoriesOpen(false)} // back arrow
              onSelectCategory={handleCategory}
            />
          </SlideMenu>
          <li className="p-4 shadow-lg rounded-full cursor-pointer">
            About Us
          </li>
          <li className="p-4 shadow-lg rounded-full cursor-pointer">
            Contact Us
          </li>
          <li
            className="p-4 shadow-lg rounded-full cursor-pointer"
            onClick={logout}
          >
            Logout
          </li>
        </ul>
      </SlideMenu>
    </div>
  );
}

export default Navbar;
