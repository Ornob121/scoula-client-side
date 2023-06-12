import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useIsTeacher from "../../Hooks/useIsTeacher";
import useIsAdmin from "../../Hooks/useIsAdmin";

const Classes = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isUserTeacher] = useIsTeacher();
  const isTeacher = isUserTeacher?.teacher;

  const [isUserAdmin] = useIsAdmin();
  const isAdmin = isUserAdmin?.admin;

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleSelectClass = (course) => {
    console.log(course);
    const selectedCourse = {
      name: course.className,
      image: course.image,
      availableSeats: course.availableSeats,
      instructorEmail: course.instructorEmail,
      instructorName: course.instructorName,
      price: course.coursePrice,
      email: user?.email,
      classId: course._id,
    };
    fetch("http://localhost:5000/selectedClasses", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(selectedCourse),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Great",
            text: "This Class is booked",
          });
        }
      });
  };

  return (
    <div className="py-20 px-10 md:px-20 bg-[#F3F4F7]">
      <h2 className="text-4xl font-bold text-center text-yellow-400">
        Here are all of our courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        {courses.map((course) => {
          return (
            <div
              key={course._id}
              className={` w-[400px]  ${
                course.availableSeats === 0 ? "bg-red-500" : "bg-white"
              }`}
            >
              <img src={course.image} className="w-[400px] h-[400px]" alt="" />
              <h4 className="text-3xl pl-6 py-3 font-bold text-yellow-400">
                {course.className}
              </h4>
              <h5 className="text-xl pl-6 font-semibold pb-4">
                Instructor: {course.instructorName}
              </h5>
              <div className="px-6 flex justify-between pb-4 text-xl">
                <p>Available Seats: {course.availableSeats}</p>
                <p>Price: ${course.coursePrice}</p>
              </div>
              <button
                onClick={() => {
                  user ? handleSelectClass(course) : navigate("/login");
                }}
                disabled={!course.availableSeats}
                className={`w-full py-4 bg-yellow-400 text-xl font-bold hover:bg-black hover:text-white mt-5 ${
                  course.availableSeats ? "" : "btn-disabled"
                } ${isTeacher ? "btn-disabled" : ""} ${
                  isAdmin ? "btn-disabled" : ""
                }`}
              >
                Book
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classes;
