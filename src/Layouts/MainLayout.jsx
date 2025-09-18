import { useContext, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useNavigate, useLocation } from "react-router";
import { UserContext } from "../context/userContext";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSession, admin } = useContext(UserContext);

  useEffect(() => {
    if (userSession && location.pathname === "/login") {
      // ✅ already signed in → block login page
      navigate("/", { replace: true });
    } else if (!userSession && location.pathname !== "/login") {
      // ✅ not signed in → block protected routes
      navigate("/login", { replace: true });
    }
  }, [userSession, navigate, location]);

  console.log("admin", admin);

  return (
    <>
      <div className="fixed z-50 w-[100vw]">
        <Navbar />
      </div>

      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
