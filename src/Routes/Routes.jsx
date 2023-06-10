import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import InstructorsDetails from "../Pages/Instructors/InstructorsDetails";
import Classes from "../Pages/Classes/Classes";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import SelectedClasses from "../Pages/Dashboard/SelectedClasses/SelectedClasses";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/popularCourses"),
      },
      {
        path: "/instructors",
        element: <Instructors />,
        loader: () => fetch("http://localhost:5000/instructors"),
      },
      {
        path: "/instructors/:id",
        element: <InstructorsDetails />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "selected-classes",
        element: (
          <PrivateRoute>
            <SelectedClasses />
          </PrivateRoute>
        ),
      },

      // ! Admin routes
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
