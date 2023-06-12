import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useIsTeacher = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isTeacher, isLoading: isTeacherLoading } = useQuery({
    queryKey: ["teacher", user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure(`/users/teacher/${user?.email}`);
      console.log(response);
      return response.data;
    },
  });
  return [isTeacher, isTeacherLoading];
};

export default useIsTeacher;
