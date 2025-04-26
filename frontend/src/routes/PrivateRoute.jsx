import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ adminOnly = false }) => {
  const { user } = useAuth();

  const storedUser = localStorage.getItem("user");
  const currentUser = user || (storedUser ? JSON.parse(storedUser) : null);

  if (!currentUser) {
    console.log("User not authenticated, redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && currentUser.role !== "admin") {
    console.log("User is not admin, redirecting to home.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
