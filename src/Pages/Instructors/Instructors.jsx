import { Link, useLoaderData } from "react-router-dom";
import bg from "../../assets/images/footer/insructorBG.png";
const Instructors = () => {
  const datas = useLoaderData();
  //   console.log(datas);

  return (
    <div
      className="px-10 md:px-20 pt-12 pb-10"
      style={{
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-3xl text-center pb-12 font-medium text-yellow-500">
        Here Are All Of Our Instructors
      </h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-10">
        {datas.map((instructors) => {
          return (
            <div
              key={instructors._id}
              className="bg-white p-8 pt-12  shadow-xl relative rounded-lg w-96 h-96 mx-auto text-center"
            >
              <img
                src={instructors.image}
                className="h-24 w-24 mx-auto rounded-full"
                alt=""
              />
              <h4 className="text-2xl  font-semibold py-4">
                {instructors.name}
              </h4>
              <p className="text-xl font-medium">Email: {instructors.email}</p>
              <Link to={`/instructors/${instructors._id}`}>
                <button className="absolute text-xl rounded-b-lg font-semibold bottom-0 left-0 py-4 w-full bg-yellow-500">
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

export default Instructors;
