import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import {
  FaBookmark,
  FaChalkboardTeacher,
  FaCheck,
  FaHome,
  FaSchool,
  FaWallet,
} from "react-icons/fa";
const Dashboard = () => {
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
        <ul className="pl-9 pb-6">{studentNav}</ul>
        <hr />
        <ul className="pl-9 pt-6">{mainNav}</ul>
      </div>
      <div className="col-span-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
