import { useLoaderData } from "react-router-dom";
import "./PopularClasses.css";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { motion } from "framer-motion";

const PopularClasses = () => {
  const { webMode } = useContext(AuthContext);
  const popularClasses = useLoaderData();
  // console.log(popularClasses);
  return (
    <div
      className={`md:py-12 py-8 md:px-20  ${
        webMode === "dark" ? "bg-[#36454F]" : "bg-white"
      }`}
    >
      <h2 className="capitalize md:text-3xl text-2xl font-medium text-center">
        Here Are Our popular courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 md:mt-10 gap-20">
        {popularClasses.map((popular) => {
          return (
            <motion.div
              whileHover={{ scale: 1.2 }}
              key={popular._id}
              className="w-96 h-96 mx-auto card-div"
            >
              <img className=" mx-auto w-96 h-96" src={popular.image} alt="" />
              <p className="text-center font-semibold relative bottom-20 text-3xl h-20 w-full details-info bg-[#5373] text-white">
                {popular.className}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularClasses;
