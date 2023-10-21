import { useLocation, useRoutes } from "react-router-dom";
import { cloneElement } from "react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UserContext } from "../Components/Context/Context.tsx";

import Login from "../Pages/Login.tsx";
import NewPost from "../Pages/NewPost.tsx";
import Header from "../Header.tsx";
import Home from "../Pages/Home.tsx";
import PostDetail from "../Pages/PostDetail.tsx";

const Routes = () => {
  const [logged, setLogged] = useState("");

  const router = useRoutes([
    {
      path: "/",
      element: <Header />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/post/:slug",
          element: <PostDetail />,
        },
        { path: "/login", element: <Login /> },
        { path: "/new-post", element: <NewPost /> },
      ],
    },
  ]);

  const location = useLocation();

  if (!router) return null;

  return (
    <UserContext.Provider value={{ logged, setLogged }}>
      <AnimatePresence mode="wait">
        {cloneElement(router, { key: location.pathname })}
      </AnimatePresence>
    </UserContext.Provider>
  );
};
export default Routes;
