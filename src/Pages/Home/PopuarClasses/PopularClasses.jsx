import { useLoaderData } from "react-router-dom";
import "./PopularClasses.css";

const PopularClasses = () => {
  const popularClasses = useLoaderData();
  console.log(popularClasses);
  return (
    <div className="my-12 md:px-20">
      <h2 className="capitalize text-3xl font-medium text-center">
        Here Are Our popular courses
      </h2>
      <div className="grid grid-cols-3 mt-10 gap-8">
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
