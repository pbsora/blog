import { Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="font-roboto bg-black text-white text-3xl grid place-content-center py-6">
        <h1>Sora</h1>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Header;
