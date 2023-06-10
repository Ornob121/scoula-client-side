import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faTasks,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaBookmark,
  FaChalkboardTeacher,
  FaCheck,
  FaHome,
  FaSchool,
  FaWallet,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const handleMakeTeacher = () => {};

  const isAdmin = true;
  const hello = true;

  // ! This is the student navigation bar
  const studentNav = (
    <>
      <li className="text-xl font-semibold py-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-2 items-center"
              : "text-black flex gap-2 items-center"
          }
          to="/dashboard/selected-classes"
        >
          <FaBookmark className="text-2xl" /> <span>Selected Classes</span>
        </NavLink>
      </li>
      <li className="text-xl font-semibold pb-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-2 items-center"
              : "text-black flex gap-2 items-center"
          }
          to="/dashboard/enrolled-classes"
        >
          <FaCheck className="text-2xl" /> <span>Enrolled Classes</span>
        </NavLink>
      </li>
      <li className="text-xl font-semibold pb-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-2 items-center"
              : "text-black flex gap-2 items-center"
          }
          to="/dashboard/payment-history"
        >
          <FaWallet className="text-2xl" /> <span>Payment History</span>
        </NavLink>
      </li>
      <button
        className="text-lg text-blue-400 pr-5 py-5"
        onClick={handleMakeTeacher}
      >
        Are You A Teacher? Be A Teacher
      </button>
    </>
  );

  // ! This is admin navigation bar

  const adminNav = (
    <>
      <li className="text-xl font-semibold py-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-3 items-center"
              : "text-black flex gap-3 items-center"
          }
          to="/dashboard/manage-classes"
        >
          <FontAwesomeIcon className="text-2xl" icon={faTasks} />
          <span>Manage Classes</span>
        </NavLink>
      </li>
      <li className="text-xl font-semibold pb-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-3 items-center"
              : "text-black flex gap-3 items-center"
          }
          to="/dashboard/manage-users"
        >
          <FontAwesomeIcon icon={faUsers} className="text-2xl" />{" "}
          <span>Manage Users</span>
        </NavLink>
      </li>
      <li className="text-xl font-semibold pb-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-3 items-center"
              : "text-black flex gap-3 items-center"
          }
          to="/dashboard/payment-teachers"
        >
          <FontAwesomeIcon icon={faChalkboardTeacher} className="text-2xl" />
          <span>Manage Teachers</span>
        </NavLink>
      </li>
    </>
  );

  //   ! This is the main nav bar
  const mainNav = (
    <>
      <li className="text-xl font-semibold py-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-2 items-center "
              : "text-black flex gap-2 items-center"
          }
          to="/"
        >
          <FaHome className="text-2xl" /> Home
        </NavLink>
      </li>
      <li className="text-xl font-semibold pb-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-2 items-center "
              : "text-black flex gap-2 items-center"
          }
          to="/instructors"
        >
          <FaChalkboardTeacher className="text-2xl" /> Instructors
        </NavLink>
      </li>
      <li className="text-xl font-semibold pb-8">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 flex gap-2 items-center "
              : "text-black flex gap-2 items-center"
          }
          to="/classes"
        >
          <FaSchool /> <span>Classes</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="grid grid-cols-6">
      <div className="border-r h-[100vh] border-gray-200 ">
        <img src={logo} alt="" className="mt-12 pl-9" />
        {isAdmin && <ul className="pl-9 pb-6">{adminNav}</ul>}
        {isAdmin || <ul className="pl-9 pb-6">{studentNav}</ul>}
        <hr />
        <ul className="pl-9 pt-6">{mainNav}</ul>
      </div>
      <div className="col-span-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
