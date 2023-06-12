import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useIsAdmin from "../../../Hooks/useIsAdmin";
import useIsTeacher from "../../../Hooks/useIsTeacher";
import { FaMoon, FaSun } from "react-icons/fa";

const NavBar = () => {
  const { user, logOut, lightMode, darkMode, webMode } =
    useContext(AuthContext);
  const [isUserAdmin] = useIsAdmin();
  const [isUserTeacher] = useIsTeacher();
  const isAdmin = isUserAdmin?.admin;
  const isTeacher = isUserTeacher?.teacher;
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err.message));
  };
  const navItem = (
    <>
      <li className="text-xl">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li className="text-xl">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
          }
          to="/instructors"
        >
          Instructors
        </NavLink>
      </li>
      <li className="text-xl">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
          }
          to="/classes"
        >
          Classes
        </NavLink>
      </li>
      {user &&
        (isAdmin || isTeacher || (
          <li className="text-xl">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
              }
              to="/dashboard/selected-classes"
            >
              Dashboard
            </NavLink>
          </li>
        ))}
      {isAdmin && (
        <li className="text-xl">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
            }
            to="/dashboard/manage-users"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {isTeacher && (
        <li className="text-xl">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
            }
            to="/dashboard/my-classes"
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  const logItems = (
    <>
      {user ? (
        <div className="flex items-center gap-5 mr-5">
          <img className="h-12 w-12 rounded-full" src={user.photoURL} alt="" />
          <button
            onClick={handleLogOut}
            className="text-xl text-white btn btn-error"
          >
            <NavLink>Logout</NavLink>
          </button>
        </div>
      ) : (
        <button className="text-xl btn btn-info mr-5">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
            }
            to="/login"
          >
            Login
          </NavLink>
        </button>
      )}
      <button>
        {webMode === "light" ? (
          <FaSun
            className="text-4xl text-yellow-400"
            onClick={() => {
              darkMode();
            }}
          />
        ) : (
          <FaMoon
            className="text-4xl text-gray-300 "
            onClick={() => {
              lightMode();
            }}
          />
        )}
      </button>
    </>
  );
  return (
    <div
      className={`navbar md:px-8 sticky top-0 z-10  py-5 items-center ${
        webMode === "dark" ? "bg-[#36454F]" : "bg-white"
      }`}
    >
      <div className="navbar-start  ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItem}
          </ul>
        </div>
        <Link className="btn btn-ghost normal-case md:ml-0 ml-10 text-xl">
          <img src={logo} className="md:w-auto w-28" alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItem}</ul>
      </div>
      <div className="navbar-end">{logItems}</div>
    </div>
  );
};

export default NavBar;
