import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);
 
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
