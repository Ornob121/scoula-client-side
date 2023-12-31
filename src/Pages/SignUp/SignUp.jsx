import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const image_api_pk = import.meta.env.VITE_API_IMG_PK;

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);
  const [passErr, setPassErr] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [showCon, setShowCon] = useState(false);

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_api_pk}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      return setPassErr("Your Password Did Not Matched");
    } else {
      setPassErr("");
    }
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          createUser(data.email, data.password)
            .then((result) => {
              const image = imgData.data.display_url;

              const newUser = result.user;
              updateProfile(newUser, {
                displayName: data.name,
                photoURL: image,
              });
              const savedUser = {
                name: data.name,
                email: data.email,
                image: image,
              };
              fetch("https://scoula-server-side.vercel.app/users", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(savedUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.acknowledged) {
                    Swal.fire({
                      icon: "success",
                      title: "Great",
                      text: "User Created Successfully",
                    });
                    reset();
                  }
                  navigate("/");
                });
            })
            .catch((err) => {
              console.log(err.message);
              if (err.message.includes("email-already-in-use")) {
                setError("This email is already in use");
              }
            });
        }
      });
  };
  console.log(errors);
  const { webMode } = useContext(AuthContext);
  return (
    <div className="py-20 px-10 md:px-20 shadow-2xl md:w-2/3 w-5/6 mx-auto  pb-28">
      <h2 className="text-center font-bold text-4xl pb-4 pt-12">
        Login to <span className="text-yellow-400">Scuola</span>
      </h2>
      <p
        className="text-blue-500 cursor-pointer text-4xl"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </p>
      <Link to="/login">
        <p className="text-center text-blue-500">Already a member? Login now</p>
      </Link>

      <p className="text-red-500">{error}</p>
      <div className="md:px-32">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <label
              className={`relative font-medium left-20  ${
                webMode === "dark" ? "bg-black" : "bg-white"
              } text-xl top-3`}
              htmlFor=""
            >
              Name
            </label>
            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type="text"
              name="name"
              id="name"
              {...register("name")}
              required
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          <div className="pb-4">
            <label
              className={`relative font-medium left-20  ${
                webMode === "dark" ? "bg-black" : "bg-white"
              } text-xl top-3`}
              htmlFor=""
            >
              Email
            </label>
            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type="email"
              name="email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="">
            <label
              className={`relative font-medium left-20  ${
                webMode === "dark" ? "bg-black" : "bg-white"
              } text-xl top-3`}
              htmlFor=""
            >
              Password
            </label>

            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type={show ? "text" : "password"}
              name="password"
              id="name"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/,
              })}
            />
            {show ? (
              <FaEye
                className=" text-3xl text-yellow-400 relative left-[550px] bottom-10 cursor-pointer"
                onClick={() => setShow(false)}
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShow(!show)}
                className="text-3xl text-blue-500 relative left-[550px] bottom-10 cursor-pointer"
              />
            )}
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case and one special
                character.
              </p>
            )}
          </div>
          <div className="">
            <label
              className={`relative font-medium left-20  ${
                webMode === "dark" ? "bg-black" : "bg-white"
              } text-xl top-3`}
              htmlFor=""
            >
              Confirm Password
            </label>
            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type={showCon ? "text" : "password"}
              name="confirmPassword"
              {...register("confirmPassword", { required: true })}
            />

            {showCon ? (
              <FaEye
                className=" text-3xl text-yellow-400 relative left-[550px] bottom-10 cursor-pointer"
                onClick={() => setShowCon(false)}
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowCon(!showCon)}
                className="text-3xl text-blue-500 relative left-[550px] bottom-10 cursor-pointer"
              />
            )}
            <p className="text-red-500">{passErr}</p>
          </div>
          <div className="pb-6">
            <label
              className={`relative font-medium left-40  ${
                webMode === "dark" ? "bg-black" : "bg-white"
              } text-xl top-3`}
              htmlFor=""
            >
              Profile Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-warning w-full"
              {...register("image")}
              required
            />
          </div>
          <button
            className="w-full py-3 mt-5 bg-yellow-400 hover:bg-black hover:text-white text-xl font-medium"
            type="submit"
          >
            SignUp
          </button>
        </form>
        <SocialLogin title={"SignUp With"} text={"User Created Successfully"} />
      </div>
    </div>
  );
};

export default SignUp;
