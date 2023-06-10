import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["users"],
    enabled: !loading && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure("/users/admin");
      return res.data;
    },
  });
  return [users, refetch, isUserLoading];
};

export default useUser;
