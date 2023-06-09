import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import AuthProviders from "./Providers/AuthProviders";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProviders>
    <React.StrictMode>
      <div className="max-w-screen-2xl mx-auto">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </React.StrictMode>
  </AuthProviders>
);
