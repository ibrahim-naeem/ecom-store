import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../context/userContext";

export default function PublicRoute() {
  const { userSession, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;

  // If logged in → redirect to home
  return userSession ? <Navigate to="/" replace /> : <Outlet />;
}
