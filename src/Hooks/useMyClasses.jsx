import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";

const useMyClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: myClasses = [],
    refetch,
    isLoading: isMyClassesLoading,
  } = useQuery({
    queryKey: ["myClasses", user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure(
        `/courses/instructors?email=${user?.email}`
      );
      return response.data;
    },
  });
  return [myClasses, refetch, isMyClassesLoading];
};

export default useMyClasses;
