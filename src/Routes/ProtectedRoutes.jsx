import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/userContext";

export default function ProtectedRoute() {
  const { userSession, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;

  return userSession ? <Outlet /> : <Navigate to="/login" replace />;
}
