import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  //   console.log(user, loading);
  if (user) {
    return children;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
