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

import AddAClass from "../Pages/Dashboard/Instructor/AddAClass/AddAClass";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses/MyClasses";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses/ManageClasses";
import UpdateClass from "../Pages/Dashboard/Instructor/MyClasses/UpdateClass";
import Payment from "../Pages/Dashboard/Payment/Payment";
import EnrolledClasses from "../Pages/Dashboard/EnrolledClasses/EnrolledClasses";
import SinglePayment from "../Pages/Dashboard/Payment/SinglePayment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminRoute from "./AdminRoute";
import TeacherRoute from "./TeacherRoute";
import ErrorPage from "../Pages/Error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage></ErrorPage>,
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
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "selected-classes",
        element: (
          <PrivateRoute>
            <SelectedClasses />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "payment/:id",
        element: <SinglePayment />,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },

      // ! Admin routes
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            {" "}
            <ManageUsers />
          </AdminRoute>
        ),
      },

      // ! Teacher routes
      {
        path: "add-a-class",
        element: (
          <TeacherRoute>
            <AddAClass />
          </TeacherRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <TeacherRoute>
            <MyClasses />
          </TeacherRoute>
        ),
      },
      {
        path: "my-classes/:id",
        element: (
          <TeacherRoute>
            <UpdateClass />
          </TeacherRoute>
        ),
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
