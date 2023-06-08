import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
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
        <form>
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
              required
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
              type="password"
              name="password"
              id="name"
              required
            />
          </div>
          <button className="w-full py-3 mt-5 bg-yellow-400 hover:bg-black hover:text-white text-xl font-medium">
            Login
          </button>
        </form>
        <SocialLogin title={"Login With"} />
      </div>
    </div>
  );
};

export default Login;
