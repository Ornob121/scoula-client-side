import { FaTrashAlt } from "react-icons/fa";
import useUser from "../../../../Hooks/useUser";
import {
  faChalkboardTeacher,
  faUser,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, refetch] = useUser();
  const [axiosSecure] = useAxiosSecure();

  // ! Admin making
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Are you sure you want to make ${user.name} admin?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am sure",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((data) => {
            if (data.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is an Admin Now!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  // ! Teacher making
  const handleMakeTeacher = (user) => {
    Swal.fire({
      title: `Are you sure you want to make ${user.name} teacher?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am sure",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/instructor/${user._id}`)
          .then((data) => {
            if (data.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is a Teacher Now!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  // ! Delete user
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: `Are you sure you want to delete ${user.name} user?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am sure",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/admin/delete/${user._id}`)
          .then((data) => {
            if (data.data.deletedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is deleted!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };
  return (
    <div className="py-20">
      <h3 className="text-4xl font-semibold text-center">
        Total Users: {users.length}
      </h3>
      <div className="mx-auto w-4/5 pt-12">
        <table className="table mx-auto">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
              <th>Profile</th>
              <th>Role</th>
              <th>Make Admin</th>
              <th>Make Teacher</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>
                  <p>{user.email}</p>
                </td>
                <td>
                  <h4 className="text-lg">{user.name}</h4>
                </td>

                <td>
                  <img
                    src={user.image}
                    className="w-14 rounded-full h-14 "
                    alt=""
                  />
                </td>
                <td>
                  <button className="font-bold text-2xl">
                    {(user?.role === "admin" && (
                      <FontAwesomeIcon
                        title="Admin"
                        className="text-white bg-blue-700 py-2 px-2"
                        icon={faUserShield}
                      />
                    )) ||
                      (user?.role === "teacher" && (
                        <FontAwesomeIcon
                          title="Teacher"
                          className="text-white bg-red-600 py-2 px-2"
                          icon={faChalkboardTeacher}
                        />
                      )) || (
                        <FontAwesomeIcon
                          title="Student"
                          className="text-white bg-yellow-400 py-2 px-3"
                          icon={faUser}
                        />
                      )}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className={`btn bg-blue-500 ${
                      user.role === "admin" && "btn-disabled"
                    }`}
                    // onClick={() => handleDelete(selected._id)}
                  >
                    Make Admin
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleMakeTeacher(user)}
                    className={`btn bg-red-500 ${
                      user.role === "teacher" && "btn-disabled"
                    }`}
                    // onClick={() => handleDelete(selected._id)}
                  >
                    Make Teacher
                  </button>
                </td>
                <td>
                  <button
                    className="btn bg-red-500"
                    onClick={() => handleDeleteUser(user)}
                    // onClick={() => handleDelete(selected._id)}
                  >
                    <FaTrashAlt className="text-2xl font-semibold text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
