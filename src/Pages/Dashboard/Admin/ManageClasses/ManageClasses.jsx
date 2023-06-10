import useAllCourses from "../../../../Hooks/useAllCourses";

const ManageClasses = () => {
  const [allCourses] = useAllCourses();

  return (
    <div className="px-20 py-12 bg-gray-50">
      <h2 className="uppercase font-semibold text-3xl text-yellow-400">
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
                  <p>Available Seats: ${course.availableSeats}</p>
                </div>
                <div className="text-xl py-4 text-start flex gap-2">
                  Status:{" "}
                  <p className="font-bold">
                    {(course.status === "pending" && (
                      <p className="text-blue-400">Pending</p>
                    )) ||
                      (course.status === "approved" && (
                        <p className="text-green-500">Approved</p>
                      )) ||
                      (course.status === "denied" && (
                        <p className="text-red-500">Denied</p>
                      ))}
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    className={`bg-green-500 font-bold hover:bg-black text-white py-2 px-6 rounded-sm ${
                      course.status === "approved" || course.status === "denied"
                        ? "btn-disabled"
                        : ""
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    className={`bg-red-500 hover:bg-black text-white font-bold py-2 px-6 rounded-sm ${
                      course.status === "denied" || course.status === "approved"
                        ? "btn-disabled"
                        : ""
                    } `}
                  >
                    Deny
                  </button>
                </div>
              </div>
              <button className="absolute text-xl rounded-b-lg font-semibold bottom-0 left-0 py-4 w-full bg-yellow-500 hover:text-white hover:bg-black">
                Feedback
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageClasses;
