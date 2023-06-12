import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-[calc(100vh-700px)]">
        <Outlet />
        <ScrollRestoration />
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
