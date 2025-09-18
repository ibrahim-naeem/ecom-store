import { useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { supabase } from "../database/supabase";
import { UserContext } from "../context/userContext";

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

const categoriesName = ["Oxford", "Derby", "Monk Strap", "Loafers"];

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [subNav, setSubNav] = useState(false);
  const [subNavOne, setSubNavOne] = useState(false);
  const { admin } = useContext(UserContext);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error.message);
      }
      navigate("/login");
    } catch (err) {
      console.error("Unexpected signOut error:", err);
    }
  };
  return (
    <div className=" w-full z-50">
      <div className="flex justify-between items-center  px-20 py-5 bg-gray-600 text-white font-bold">
        <button onClick={() => navigate("/")}>ECOM STORE</button>
        <button
          className="right-0 md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Navigation */}
      <SlideMenu isOpen={open} setIsOpen={setOpen} top={"top-0"}>
        <div className="flex justify-between items-center p-5 bg-gray-600 text-white">
          <span>LOGO</span>
          <X
            onClick={() => {
              setOpen(false);
              setSubNav(false);
              setSubNavOne(false);
            }}
          />
        </div>
        <ul className=" p-5 z-20">
          {admin && (
            <li
              className="p-4 shadow-lg rounded-full"
              onClick={() => {
                navigate("/dashboard");
                setOpen(false);
              }}
            >
              Go to Dashboard
            </li>
          )}
          <li className="p-4 shadow-lg rounded-full flex items-center justify-between">
            <span>Categories</span>
            <ChevronRight onClick={() => setSubNav(!subNav)} />

            {/* sub nav */}
            <SlideMenu
              isOpen={subNav}
              setIsOpen={setSubNav}
              zIndex={"z-30"}
              top={"top-16"}
            >
              <ul className="p-5 ">
                <ArrowLeft
                  onClick={() => setSubNav(!subNav)}
                  className="ml-auto mr-6 mb-4"
                />
                <li className="p-4 shadow-lg rounded-full flex items-center justify-between">
                  <span>{categoriesName[0]}</span>
                  <ChevronRight onClick={() => setSubNavOne(!subNavOne)} />

                  {/* sub nav one */}
                  <SlideMenu isOpen={subNavOne} zIndex={"z-40"} top={"top-16"}>
                    <ul className="p-5 ">
                      <ArrowLeft
                        onClick={() => setSubNavOne(!subNavOne)}
                        className="ml-auto mr-6 mb-4"
                      />
                      <li className="p-4 shadow-lg rounded-full flex items-center justify-between">
                        <span>Alpha</span>
                        {/* <ChevronRight /> */}
                      </li>
                      <li className="p-4 shadow-lg rounded-full">One </li>
                      <li className="p-4 shadow-lg rounded-full">Two</li>
                      <li className="p-4 shadow-lg rounded-full">Three</li>
                    </ul>
                  </SlideMenu>
                </li>
                <li className="p-4 shadow-lg rounded-full">
                  {categoriesName[1]}
                </li>
                <li className="p-4 shadow-lg rounded-full">
                  {categoriesName[2]}
                </li>
                <li className="p-4 shadow-lg rounded-full">
                  {categoriesName[3]}
                </li>
              </ul>
            </SlideMenu>
          </li>
          <li className="p-4 shadow-lg rounded-full">All Products</li>
          <li className="p-4 shadow-lg rounded-full">About Us</li>
          <li className="p-4 shadow-lg rounded-full">Contact Us</li>
          <li
            className="p-4 shadow-lg rounded-full"
            onClick={() => {
              logout();
              setOpen(false);
              setSubNav(false);
              setSubNavOne(false);
            }}
          >
            Logout
          </li>
        </ul>
      </SlideMenu>
    </div>
  );
}

export default Navbar;
