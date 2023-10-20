import React, { useState } from "react";
import axios from "axios";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const { setValue } = useLocalStorage("token", null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios({
      method: "post",
      url: "/api/login",
      data: { username: login.username, password: login.password },
      withCredentials: true,
    });
    if (data.message) {
      setError({
        error: true,
        message: data.message,
      });
    }
    setValue(data.token);
    navigate("/new-post");
  };

  return (
    <form
      onSubmit={submitLogin}
      className="w-[90vw] md:w-[40vw] lg:w-[30vw] h-[60vh] m-auto font-roboto flex flex-col justify-center items-center gap-6"
    >
      <div className="block w-full">
        <label htmlFor="username" className="block text-3xl">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={login.username}
          onChange={handleChange}
          className="w-full px-2 py-3 text-lg border-2 border-black rounded-xl focus:outline-blue-500"
        />
      </div>
      <div className="block w-full">
        <label htmlFor="password" className="block text-3xl">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          className="w-full px-2 py-3 text-lg border-2 border-black rounded-xl focus:outline-blue-500"
        />
      </div>
      <button className="w-2/4 px-6 py-3 border-2 border-black rounded">
        Login
      </button>
      <span className="text-xl text-red-500">
        {error.error && error.message}
      </span>
    </form>
  );
};
export default Login;
