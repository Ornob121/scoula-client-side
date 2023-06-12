import { useLoaderData } from "react-router-dom";
import "./PopularClasses.css";

const PopularClasses = () => {
  const popularClasses = useLoaderData();
  // console.log(popularClasses);
  return (
    <div className="md:my-12 my-8 md:px-20">
      <h2 className="capitalize md:text-3xl text-2xl font-medium text-center">
        Here Are Our popular courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 md:mt-10 gap-8">
        {popularClasses.map((popular) => {
          return (
            <div key={popular._id} className="w-96 h-96 mx-auto card-div">
              <img className=" mx-auto w-96 h-96" src={popular.image} alt="" />
              <p className="text-center font-semibold relative bottom-20 text-3xl h-20 w-full details-info bg-[#5373] text-white">
                {popular.className}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularClasses;
