import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProviders";

const EnrolledClasses = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axiosSecure(`/payments/classes?email=${user?.email}`)
      .then((res) => setEnrolledClasses(res.data))
      .catch((error) => console.log(error));
  }, [user?.email, axiosSecure]);

  console.log(enrolledClasses);

  return <div></div>;
};

export default EnrolledClasses;
