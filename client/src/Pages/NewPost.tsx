import { UserContext, ILogged } from "../Components/Context/Context";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const NewPost = () => {
  const { logged } = useContext(UserContext) as ILogged;
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(false);
  const [post, setPost] = useState({
    title: "",
    post: "",
  });

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await axios.post(
      "/api/post",
      { title: post.title, post: post.post, public: isPublic },
      {
        withCredentials: true,
      }
    );
    navigate(`/post/${data.slug.slug}`);
  };

  return (
    <motion.form
      className="w-[90vw] md:w-[70vw] lg:w-[60vw]  h-[80vh] m-auto mt-6 font-roboto  "
      onSubmit={submitPost}
      initial={{ x: -5000 }}
      animate={{ x: 0, transition: { duration: 0.7 } }}
      exit={{ x: -5000, opacity: 0, transition: { duration: 0.7 } }}
    >
      <div className="block w-full m-auto mt-6 md:w-3/4 ">
        <label htmlFor="title" className="block mb-4 text-3xl">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="w-full px-2 py-3 text-lg border-2 border-black rounded-xl focus:outline-blue-500"
        />
      </div>
      <div className="w-full m-auto mt-6 bblock md:w-3/4 ">
        <label htmlFor="post" className="block mb-4 text-3xl">
          Post
        </label>
        <textarea
          name="post"
          value={post.post}
          onChange={handleChange}
          cols={30}
          rows={10}
          className="w-full px-2 py-3 text-lg border-2 border-black rounded-xl focus:outline-blue-500"
        ></textarea>
      </div>
      <div className="flex items-center justify-center w-3/4 gap-6 m-auto mt-6 ">
        <label htmlFor="public" className="text-3xl">
          Public
        </label>
        <input
          type="checkbox"
          name="public"
          className="w-6 h-6"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
      </div>
      <div className="grid w-3/4 m-auto mt-6 place-content-center">
        <button
          type="submit"
          className="p-6 duration-200 border-2 border-black rounded-xl hover:bg-zinc-200"
        >
          Submit post
        </button>
      </div>
    </motion.form>
  );
};
export default NewPost;
