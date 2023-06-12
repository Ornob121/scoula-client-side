import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import useIsTeacher from "../../Hooks/useIsTeacher";
import useIsAdmin from "../../Hooks/useIsAdmin";

const InstructorsDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isUserTeacher] = useIsTeacher();
  const isTeacher = isUserTeacher?.teacher;

  const [isUserAdmin] = useIsAdmin();
  const isAdmin = isUserAdmin?.admin;

  //   console.log(id, "from params");
  const [instructor, setInstructor] = useState("");
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    fetch(`https://scoula-server-side.vercel.app/instructors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInstructor(data.result);
        setClassList(data.classesResult);
      });
  }, [id]);

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
    fetch("https://scoula-server-side.vercel.app/selectedClasses", {
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
    <div className="md:px-20 px-10 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={instructor.image}
          className="w-[600px] h-[500px]  rounded-lg"
          alt=""
        />
        <div>
          <h2 className="text-4xl font-semibold text-yellow-500">
            {instructor.name}
          </h2>
          <p className="text-xl py-2">{instructor.email}</p>
          <p className="text-2xl pt-4 font-semibold">
            Total Classes: {classList.length}
          </p>
          <div
            className={`mt-5 ${
              classList.length >= 2 ? "md:grid grid-cols-2" : ""
            } grid grid-cols-1 gap-7`}
          >
            {classList.map((classes) => {
              return (
                <div
                  key={classes._id}
                  className="bg-white p-8 pt-12  shadow-xl relative rounded-lg w-80 mx-auto text-center"
                >
                  <img src={classes.image} className="w-64 h-40" alt="" />
                  <h4 className="text-2xl  font-semibold py-4">
                    {classes.className}
                  </h4>
                  <div>
                    <p className="text-xl font-medium">
                      Available Seats: {classes.availableSeats}
                    </p>
                    <p className="text-xl font-medium">
                      Price: ${classes.coursePrice}
                    </p>
                    <button
                      onClick={() => {
                        user ? handleSelectClass(classes) : navigate("/login");
                      }}
                      disabled={!classes.availableSeats}
                      className={`w-full py-4 bg-yellow-400 text-xl font-bold hover:bg-black hover:text-white mt-5 ${
                        classes.availableSeats ? "" : "btn-disabled"
                      } ${isTeacher ? "btn-disabled" : ""} ${
                        isAdmin ? "btn-disabled" : ""
                      }`}
                    >
                      Book
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorsDetails;
