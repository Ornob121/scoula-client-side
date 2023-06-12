import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  //   console.log(user, loading);
  if (user) {
    return children;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return <Navigate to="/login" replace state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
