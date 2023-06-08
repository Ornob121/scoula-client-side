import { Link } from "react-router-dom";
import bg from "../../../assets/images/footer/insructorBG.png";
import { useEffect, useState } from "react";

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/popularInstructors")
      .then((res) => res.json())
      .then((data) => setPopularInstructors(data));
  }, []);
  return (
    <div
      className="px-20 pt-12 pb-10"
      style={{
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-3xl text-center pb-5 font-medium">
        Here Are Some Of Our Popular Instructors
      </h2>
      <div className=" grid grid-cols-3 gap-10">
        {popularInstructors.map((instructors) => {
          return (
            <div
              key={instructors._id}
              className="bg-white relative p-8 shadow-xl rounded-lg w-80 h-80 mx-auto text-center"
            >
              <img
                src={instructors.instructorImage}
                className="h-24 w-24 mx-auto rounded-full"
                alt=""
              />
              <h4 className="text-2xl  font-semibold py-4">
                {instructors.instructorName}
              </h4>

              <Link to={`/instructors/${instructors._id}`}>
                <button className=" text-xl absolute hover:bg-black hover:text-white mt-4 bottom-0 rounded-b-lg font-semibold left-0 py-4 w-full bg-yellow-500">
                  Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularInstructors;
