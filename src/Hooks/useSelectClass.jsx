import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";

const useSelectClass = () => {
  const { user, loading } = useContext(AuthContext);
  //   console.log(user?.email);
  const [axiosSecure] = useAxiosSecure();

  //   const [axiosSecure] = useAxiosSecure();
  const {
    data: selectedClasses = [],
    refetch,
    isLoading: isSelectedClassesLoading,
  } = useQuery({
    queryKey: ["selectedClasses", user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure(
        `/selectedClasses?email=${user?.email}`
      );
      return response.data;
    },
  });
  return [selectedClasses, refetch, isSelectedClassesLoading];
};

export default useSelectClass;
