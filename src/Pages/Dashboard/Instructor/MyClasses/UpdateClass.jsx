import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Providers/AuthProviders";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const image_api_pk = import.meta.env.VITE_API_IMG_PK;

const UpdateClass = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://scoula-server-side.vercel.app/courses/instructors/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [id]);

  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const [axiosSecure] = useAxiosSecure();
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_api_pk}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((img) => {
        if (img.success) {
          const image = img.data.display_url;
          console.log(data);
          data.image = image;
          data.status = "pending";
          data.coursePrice = parseFloat(data.coursePrice);
          data.availableSeats = parseInt(data.availableSeats);
          console.log(data.availableSeats);
          console.log(data.coursePrice);
          data.totalStudents = 0;
          axiosSecure
            .patch(`/courses/instructors/${id}`, data)
            .then((data) => {
              if (data.data.modifiedCount) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your class has been updated",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((error) => console.log(error));
        }
      });
  };

  return (
    <div className="py-20 w-5/6 mx-auto">
      <h2 className="text-3xl font-semibold text-yellow-400 text-center ">
        Update Your Class
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-6">
          <label
            className="relative font-medium left-20 bg-white text-xl top-3"
            htmlFor=""
          >
            Class Name
          </label>
          <input
            className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
            type="text"
            name="name"
            id="name"
            placeholder={course?.className}
            {...register("className")}
            required
          />
        </div>
        <div className="pb-6">
          <label
            className=" font-medium relative top-3 left-40 bg-white text-xl "
            htmlFor=""
          >
            Class Image
          </label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-warning w-full"
            placeholder={course?.image}
            {...register("image")}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-8 pb-8">
          <div>
            <label
              className="relative font-medium left-20 bg-white text-xl top-3"
              htmlFor=""
            >
              Instructor Name
            </label>
            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type="text"
              value={user.displayName}
              {...register("instructorName")}
              required
            />
          </div>
          <div>
            <label
              className="relative font-medium left-20 bg-white text-xl top-3"
              htmlFor=""
            >
              Instructor Email
            </label>
            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type="email"
              value={user.email}
              {...register("instructorEmail")}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pb-4">
          <div>
            <label
              className="relative font-medium left-20 bg-white text-xl top-3"
              htmlFor=""
            >
              Available Seats
            </label>
            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type="text"
              placeholder={course?.availableSeats}
              {...register("availableSeats")}
              required
            />
          </div>
          <div>
            <label
              className="relative font-medium left-20 bg-white text-xl top-3"
              htmlFor=""
            >
              Price
            </label>
            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type="text"
              placeholder={course?.coursePrice}
              {...register("coursePrice")}
              required
            />
          </div>
        </div>
        <button className="w-full py-4 text-xl font-bold mt-6 hover:text-white hover:bg-black bg-yellow-400 ">
          Update Class
        </button>
      </form>
      <div className="w-40 mx-auto mt-10">
        <button
          onClick={() => navigate(-1)}
          className="text-xl font-semibold text-white bg-red-400 hover:bg-black py-3 w-full mx-auto"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UpdateClass;
