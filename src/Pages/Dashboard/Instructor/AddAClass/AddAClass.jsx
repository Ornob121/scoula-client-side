import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Providers/AuthProviders";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

//
const image_api_pk = import.meta.env.VITE_API_IMG_PK;
// console.log(image_api_pk);
const AddAClass = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { register, handleSubmit, reset } = useForm();

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
          data.image = image;
          data.status = "pending";
          data.coursePrice = parseFloat(data.coursePrice);
          data.availableSeats = parseInt(data.availableSeats);
          data.totalStudents = 0;
          axiosSecure
            .post("/courses/instructors", data)
            .then((data) => {
              if (data.data.acknowledged) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your class has been added",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((error) => console.log(error));
          console.log(data);
        }
      });
  };
  return (
    <div className="py-20 w-5/6 mx-auto">
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
              {...register("coursePrice")}
              required
            />
          </div>
        </div>
        <button className="w-full py-4 text-xl font-bold mt-6 hover:text-white hover:bg-black bg-yellow-400 ">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddAClass;
