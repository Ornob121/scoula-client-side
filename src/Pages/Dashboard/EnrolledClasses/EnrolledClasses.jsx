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

  return (
    <div className="py-20">
      <h2 className="text-center font-semibold text-4xl text-yellow-400 uppercase">
        Here are all the courses you enrolled
      </h2>
      <div className="flex justify-evenly pb-12 items-center"></div>
      <div className="mx-auto w-4/5">
        <table className="table mx-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Total Students</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {enrolledClasses.map((enrolled, i) => (
              <tr key={enrolled._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={enrolled.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-xl">
                        {enrolled.className}
                      </h3>
                    </div>
                  </div>
                </td>
                <td>
                  <p>{enrolled.instructorName}</p>
                </td>
                <td>
                  <p>{enrolled.instructorEmail}</p>
                </td>
                <td>
                  <p className="text-center">{enrolled.totalStudents}</p>
                </td>
                <td>
                  <p>${enrolled.coursePrice}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClasses;
