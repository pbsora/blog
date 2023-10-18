import { Outlet, Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

function Header() {
  return (
    <>
      <header className="font-roboto bg-black text-white text-3xl flex justify-around items-center py-6 sticky top-0">
        <h1>
          <Link to="/"> Sora</Link>
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
