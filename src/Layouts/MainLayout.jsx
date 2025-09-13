import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <div className="fixed z-50 w-full">
        <Navbar />
      </div>

      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
