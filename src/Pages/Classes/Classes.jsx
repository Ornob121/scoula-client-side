import { useEffect, useState } from "react";

const Classes = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="py-20 px-20 bg-[#F3F4F7]">
      <h2 className="text-4xl font-bold text-center text-yellow-400">
        Here are all of our courses
      </h2>
      <div className="grid grid-cols-3 gap-8 pt-12">
        {courses.map((course) => {
          return (
            <div
              key={course._id}
              className={` w-[400px] bg-white ${
                course.availableSeats ? "" : "bg-red-500"
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
                disabled={!course.availableSeats}
                className={`w-full py-4 bg-yellow-400 text-xl font-bold hover:bg-black hover:text-white mt-5 ${
                  course.availableSeats ? "" : "btn-disabled"
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
