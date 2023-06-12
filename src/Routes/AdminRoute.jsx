import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import useIsAdmin from "../Hooks/useIsAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isUserAdmin, isAdminLoading] = useIsAdmin();
  //   console.log(isAdminLoading);
  const isAdmin = isUserAdmin?.admin;
  //   console.log(isAdmin, user);
  const location = useLocation();
  //   console.log(user, loading);
  if (user && isAdmin) {
    return children;
  }
  if (loading || isAdminLoading) {
    return <p>Loading...</p>;
  }
  return <Navigate to="/login" replace state={{ from: location }}></Navigate>;
};

export default AdminRoute;
