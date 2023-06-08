import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";

const NavBar = () => {
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
      <li className="text-xl">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const logItems = (
    <>
      <button className="text-xl btn btn-info">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
          }
          to="/login"
        >
          Login
        </NavLink>
      </button>
    </>
  );
  return (
    <div
      className={`navbar md:px-8 sticky top-0 z-10 bg-white py-5 items-center `}
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
