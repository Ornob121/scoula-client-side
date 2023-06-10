import { FaTrashAlt } from "react-icons/fa";
import useMyClasses from "../../../../Hooks/useMyClasses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const MyClasses = () => {
  const [myClasses] = useMyClasses();
  console.log(myClasses);

  return (
    <div className="py-20">
      <h3 className="text-4xl font-semibold text-center">
        Total Classes: {myClasses.length}
      </h3>
      <div className="mx-auto w-4/5 pt-12">
        <table className="table mx-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Class Image</th>
              <th className="text-xs">Total Enrolled Students</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myClasses.map((myClass, i) => (
              <tr key={myClass._id}>
                <th>{i + 1}</th>
                <td>
                  <h4 className="text-lg">{myClass.className}</h4>
                </td>
                <td className="w-20 pr-20">
                  <p className="text-yellow-400 font-medium text-right">
                    ${myClass.coursePrice}
                  </p>
                </td>

                <td>
                  <img
                    src={myClass.image}
                    className="w-14 rounded-full h-14 "
                    alt=""
                  />
                </td>
                <td className="w-20 pr-10">
                  <p className="text-center">{myClass.totalStudents}</p>
                </td>
                <td>
                  <p className="uppercase">{myClass.status}</p>
                  {myClass.status === "denied" && (
                    <button className="bg-black text-white mt-2 py-2 px-3 rounded-md font-semibold">
                      Feedback
                    </button>
                  )}
                </td>
                <th>
                  <button
                    className="btn bg-red-500"
                    // onClick={() => handleDelete(myClass._id)}
                  >
                    <FaTrashAlt
                      className={`text-2xl font-semibold text-white ${
                        myClass.status === "approved" && "disabled"
                      }`}
                    />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
