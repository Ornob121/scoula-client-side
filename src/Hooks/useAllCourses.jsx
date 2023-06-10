import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";

const useAllCourses = () => {
  const { loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: allCourses = [],
    refetch,
    isLoading: isAllCoursesLoading,
  } = useQuery({
    queryKey: ["allCourses"],
    enabled: !loading && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure("/allCourses/admin");
      return res.data;
    },
  });
  return [allCourses, refetch, isAllCoursesLoading];
};

export default useAllCourses;
