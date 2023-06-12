import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = ({ title, text }) => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleGoogleSingIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        const savedUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photo: loggedUser.photoURL,
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            navigate(from, { replace: true });
            if (data.acknowledged) {
              Swal.fire({
                icon: "success",
                title: "Great",
                text: text,
              });
            }
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleSingIn}
        className="w-full py-3 text-white mt-5 bg-red-700 hover:bg-black  text-xl font-medium"
      >
        {title} Google
      </button>
    </div>
  );
};

export default SocialLogin;
