import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { signInUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setError("");
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Great",
          text: "User Login Successful",
        });
        setError("");
        reset();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message.includes("user-not-found")) {
          setError("User Not Found");
        }
        if (err.message.includes("wrong-password")) {
          setError("Wrong Password");
        }
      });
  };

  return (
    <div className="my-20 px-20 shadow-2xl w-2/3 mx-auto  pb-28">
      <h2 className="text-center font-bold text-4xl pb-4 pt-12">
        Login to <span className="text-yellow-400">Scuola</span>
      </h2>
      <p
        className="text-blue-500 cursor-pointer text-4xl"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </p>
      <Link to="/signup">
        <p className="text-center text-blue-500">Not a Member? SignUp now</p>
      </Link>
      <div className="px-32">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4">
            <label
              className="relative font-medium left-20 bg-white text-xl top-3"
              htmlFor=""
            >
              Email
            </label>
            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type="email"
              name="email"
              id="email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="pb-4">
            <label
              className="relative font-medium left-20 bg-white text-xl top-3"
              htmlFor=""
            >
              Password
            </label>
            <input
              className="border p-3 border-gray-300 w-full text-xl outline-yellow-400 shadow-md"
              type={show ? "text" : "password"}
              name="password"
              id="name"
              {...register("password", { required: true })}
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
          </div>
          <p className="text-center font-bold text-xl text-red-500">{error}</p>
          <button className="w-full py-3 mt-5 bg-yellow-400 hover:bg-black hover:text-white text-xl font-medium">
            Login
          </button>
        </form>
        <SocialLogin title={"Login With"} text="Login Successful" />
      </div>
    </div>
  );
};

export default Login;
