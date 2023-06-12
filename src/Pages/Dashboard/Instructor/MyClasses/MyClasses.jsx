import { FaScrewdriver, FaTrashAlt } from "react-icons/fa";
import useMyClasses from "../../../../Hooks/useMyClasses";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyClasses = () => {
  const [myClasses, refetch] = useMyClasses();
  //   console.log(myClasses);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://scoula-server-side.vercel.app/courses/instructors/${id}`
          )
          .then((data) => {
            if (data.data.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

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
              <th>Update</th>
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
                  {myClass.feedback && (
                    <button
                      onClick={() => {
                        setFeedback(myClass?.feedback);
                        console.log(myClass.feedback);
                        window.my_modal.showModal();
                      }}
                      className="bg-black text-white mt-2 py-2 px-3 rounded-md font-semibold"
                    >
                      Feedback
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className={`btn bg-blue-500 `}
                    onClick={() =>
                      navigate(`/dashboard/my-classes/${myClass._id}`)
                    }
                  >
                    <FaScrewdriver
                      className={`text-2xl font-semibold text-white`}
                    />
                  </button>
                </td>
                <td>
                  <button
                    className={`btn bg-red-500  ${
                      myClass.status === "approved" && "btn-disabled"
                    }`}
                    onClick={() => handleDelete(myClass._id)}
                  >
                    <FaTrashAlt
                      className={`text-2xl font-semibold text-white`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* You can open the modal using ID.showModal() method */}
        </table>
        <dialog id="my_modal" className="modal">
          <form method="dialog" className="modal-box">
            <button
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3>Feedback From Admin</h3>
            <p className="text-xl font-medium">{feedback}</p>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default MyClasses;
