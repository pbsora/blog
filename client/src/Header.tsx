import { Outlet, Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { ILogged, UserContext } from "./Components/Context/Context";
import { useContext, useEffect } from "react";
import axios from "axios";
/* import Login from "./Pages/Login"; */
import useLocalStorage from "./Hooks/useLocalStorage";

function Header() {
  const { setLogged, logged } = useContext(UserContext) as ILogged;
  const { value } = useLocalStorage("token");

  useEffect(() => {
    if (!value) return;
    else {
      const auth = async () => {
        const { data } = await axios({
          method: "post",
          url: "/api/auth",
          headers: { Authorization: `Bearer ${value}` },
          withCredentials: true,
        });

        if (!logged) setLogged(data.user);
      };
      auth();
    }
  }, [value, setLogged, logged]);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-around py-6 text-3xl text-white bg-black font-roboto">
        <h1>
          <Link to="/">Sora</Link>
        </h1>
        <span className="text-[3rem]">
          <a href="https://github.com/pbsora" target="_blank">
            <AiFillGithub />
          </a>
        </span>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Header;
