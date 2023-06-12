import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { motion } from "framer-motion";

const PopularInstructors = () => {
  const { webMode } = useContext(AuthContext);
  const [popularInstructors, setPopularInstructors] = useState([]);
  useEffect(() => {
    fetch("https://scoula-server-side.vercel.app/popularInstructors")
      .then((res) => res.json())
      .then((data) => setPopularInstructors(data));
  }, []);
  return (
    <div
      className={`md:px-20 px-5 py-6 pb-8 md:pt-12 md:pb-10 ${
        webMode === "dark" ? "bg-[#36454F]" : "background-for-instructors-bg"
      }`}
    >
      <h2 className="md:text-3xl text-2xl text-center pb-12 font-medium">
        Here Are Some Of Our Popular Instructors
      </h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-20">
        {popularInstructors.map((instructors) => {
          return (
            <motion.div
              whileInView={{ scaleY: 1.1 }}
              transition={{
                ease: "linear",
                duration: 2,
                x: { duration: 1 },
              }}
              key={instructors._id}
              className={` relative p-8 shadow-xl rounded-lg w-80 h-80 mx-auto text-center ${
                webMode === "dark"
                  ? "bg-black border border-gray-50"
                  : "bg-white"
              }`}
            >
              <img
                src={instructors.image}
                className="h-24 w-24 mx-auto rounded-full"
                alt=""
              />
              <h4 className="text-2xl  font-semibold py-4">
                {instructors.name}
              </h4>

              <Link to={`/instructors/${instructors._id}`}>
                <button className=" text-xl absolute hover:bg-black hover:text-white mt-4 bottom-0 rounded-b-lg font-semibold left-0 py-4 w-full bg-yellow-500">
                  Details
                </button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularInstructors;
