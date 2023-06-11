import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InstructorsDetails = () => {
  const { id } = useParams();
  //   console.log(id, "from params");
  const [instructor, setInstructor] = useState("");
  const [classList, setClassList] = useState([]);
  const [classLength, setClassLength] = useState(false);
  if (classList.length >= 2) {
    setClassLength(true);
  }
  useEffect(() => {
    fetch(`http://localhost:5000/instructors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInstructor(data.result);
        setClassList(data.classesResult);
      });
  }, [id]);

  return (
    <div className="px-20 py-20">
      <div className="grid grid-cols-2 gap-10">
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
          <div className={`mt-5 ${classLength ? "grid grid-cols-2" : ""}`}>
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
