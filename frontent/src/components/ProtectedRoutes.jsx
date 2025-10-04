import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, token , loading } = useContext(AuthContext);
  if (loading) return <div className=" text-center mt-4">Loading...</div>

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
