import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import InstructorsDetails from "../Pages/Instructors/InstructorsDetails";

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
    ],
  },
]);

export default router;
