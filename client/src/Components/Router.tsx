import { useLocation, useRoutes } from "react-router-dom";
import { cloneElement } from "react";
import Header from "../Header.tsx";
import Home from "../Pages/Home.tsx";
import PostDetail from "../Pages/PostDetail.tsx";
import { AnimatePresence } from "framer-motion";
import Login from "../Pages/Login.tsx";
import NewPost from "../Pages/NewPost.tsx";
import { useState } from "react";
import { UserContext } from "../Components/Context/Context.tsx";

const Routes = () => {
  const [logged, setLogged] = useState("");

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
        { path: "/login", element: <Login /> },
        { path: "/new-post", element: <NewPost /> },
      ],
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <UserContext.Provider value={{ logged, setLogged }}>
      <AnimatePresence mode="wait">
        {cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </UserContext.Provider>
  );
};
export default Routes;
