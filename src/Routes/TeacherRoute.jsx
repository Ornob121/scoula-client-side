import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useIsTeacher from "../Hooks/useIsTeacher";
import { Navigate, useLocation } from "react-router-dom";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isUserTeacher, isTeacherLoading] = useIsTeacher();
  //   console.log(isTeacherLoading, isUserTeacher);
  const isTeacher = isUserTeacher?.teacher;
  //   console.log(user, isTeacher);
  const location = useLocation();
  if (user && isTeacher) {
    return children;
  }
  if (loading || isTeacherLoading) {
    return <p>Loading...</p>;
  }
  return <Navigate to="/login" replace state={{ from: location }}></Navigate>;
};

export default TeacherRoute;
