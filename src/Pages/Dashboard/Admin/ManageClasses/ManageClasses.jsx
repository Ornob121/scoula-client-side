import Swal from "sweetalert2";
import useAllCourses from "../../../../Hooks/useAllCourses";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";

const ManageClasses = () => {
  const [allCourses, refetch] = useAllCourses();
  const [axiosSecure] = useAxiosSecure();
  const [id, setId] = useState("");

  // ! Approve Class function
  const handleApproveClass = (id) => {
    Swal.fire({
      title: "Are you sure you want to approve this class?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/courses/admin/approve/${id}`)
          .then((data) => {
            refetch();
            if (data.data.modifiedCount) {
              Swal.fire(
                "Approved!",
                "This class has been approved.",
                "success"
              );
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  // ! Deny Class Function
  const handleDenyClass = (id) => {
    Swal.fire({
      title: "Are you sure you want to deny this class?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/courses/admin/deny/${id}`)
          .then((data) => {
            refetch();
            if (data.data.modifiedCount) {
              Swal.fire("Approved!", "This class has been denied.", "success");
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const handleFeedback = (event) => {
    event.preventDefault();
    const feedback = event.target.feedback.value;
    axiosSecure
      .put(`/courses/admin/feedback/${id}`, { feedback })
      .then((data) => {
        refetch();
        if (data.data.modifiedCount) {
          Swal.fire("Done!", "The feedback has been sent.", "success");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="px-20 py-12 bg-gray-50">
      <h2 className="uppercase font-semibold text-3xl text-center text-yellow-400">
        All The Classes are here
      </h2>

      <div className=" grid grid-cols-3 gap-10 pt-16">
        {allCourses.map((course) => {
          return (
            <div
              key={course._id}
              className="bg-white  shadow-xl relative rounded-lg w-[350px] h-[590px] mx-auto text-center"
            >
              <img src={course.image} className="w-full h-52" alt="" />
              <h4 className="text-2xl font-semibold py-3 text-center">
                {course.className}
              </h4>
              <div className="px-4 text-center">
                <p className="text-xl pb-2">
                  Instructor Name: {course.instructorName}
                </p>
                <p className="text-xl pb-3 text-center">
                  Instructor Email: {course.instructorEmail}
                </p>
                <div className="flex justify-between">
                  <p>Course Price: ${course.coursePrice}</p>
                  <p>Available Seats: {course.availableSeats}</p>
                </div>
                <div className="text-xl py-4 text-start flex gap-2">
                  Status:{" "}
                  <pre className="font-bold">
                    {(course.status === "pending" && (
                      <p className="text-blue-400">Pending</p>
                    )) ||
                      (course.status === "approved" && (
                        <p className="text-green-500">Approved</p>
                      )) ||
                      (course.status === "denied" && (
                        <p className="text-red-500">Denied</p>
                      ))}
                  </pre>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleApproveClass(course._id)}
                    className={`bg-green-500 font-bold hover:bg-black hover:text-white py-2 px-6 rounded-sm ${
                      course.status === "approved" || course.status === "denied"
                        ? "btn-disabled"
                        : ""
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDenyClass(course._id)}
                    className={`bg-red-500 hover:bg-black hover:text-white font-bold py-2 px-6 rounded-sm ${
                      course.status === "denied" || course.status === "approved"
                        ? "btn-disabled"
                        : ""
                    } `}
                  >
                    Deny
                  </button>
                </div>
              </div>
              <button
                className={`absolute text-xl rounded-b-lg font-semibold bottom-0 left-0 py-4 w-full bg-yellow-500 hover:text-white hover:bg-black `}
                onClick={() => {
                  setId(course._id);
                  window.my_modal.showModal();
                }}
              >
                Send Feedback
              </button>
            </div>
          );
        })}
      </div>
      <dialog
        id="my_modal"
        className="modal modal-bottom absolute sm:modal-middle"
      >
        <div className="modal-box">
          <form method="dialog">
            <div className="modal-action mt-0">
              <button className="btn btn-error mb-4">X</button>
            </div>
          </form>
          <div>
            <form onSubmit={handleFeedback}>
              <textarea
                className="textarea textarea-info w-full h-28"
                placeholder="Feedback"
                name="feedback"
                required
              ></textarea>
              <button type="submit" className="btn btn-info mt-7">
                Send
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageClasses;
