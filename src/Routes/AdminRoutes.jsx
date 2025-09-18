import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/userContext";

export default function AdminRoute() {
  const { userSession, admin, loading } = useContext(UserContext);

  if (loading) {
    return (
      <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></span>
    );
  }

  if (!userSession) return <Navigate to="/login" replace />;

  return admin || localStorage.getItem("role") === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}
