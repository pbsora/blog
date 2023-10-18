import { useLocation, useRoutes } from "react-router-dom";
import { cloneElement } from "react";
import Header from "../Header.tsx";
import Home from "../Pages/Home.tsx";
import PostDetail from "../Pages/PostDetail.tsx";
import { AnimatePresence } from "framer-motion";

const Routes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Header />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/post/:slug",
          element: <PostDetail />,
        },
      ],
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <AnimatePresence mode="wait">
      {cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
};
export default Routes;
