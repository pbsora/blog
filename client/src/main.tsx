import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";

import Header from "./Header.tsx";
import "./index.css";
import Home from "./Pages/Home.tsx";
import PostDetail from "./Pages/PostDetail.tsx";

const router = Router([
  {
    path: "/",
    element: <Header />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/post/:id",
        element: <PostDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
