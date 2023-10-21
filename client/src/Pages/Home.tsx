import { useState, useEffect } from "react";

import Post from "../Components/Post";
import axios from "axios";
import { motion } from "framer-motion";
import { FallingLines } from "react-loader-spinner";

interface Post {
  _id: string;
  title: string;
  post: string;
  postedAt: Date | string;
  slug: string;
  _v: number;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios({
        method: "get",
        withCredentials: true,
        url: "api/post",
      });

      setPosts(data);
      setLoad(false);
    };
    getPosts();
  }, []);

  if (load)
    return (
      <div className="absolute grid w-screen top-52 place-content-center">
        <FallingLines color="black" />
      </div>
    );

  return (
    <motion.div
      className="flex  flex-col justify-center items-center gap-8 pt-6 mb-10 py-3 px-5 w-[95vw] md:w-[80vw] xl:w-[70vw] 2xl:max-w-[55vw] m-auto font-roboto"
      initial={{ x: -5000 }}
      animate={{ x: 0, transition: { duration: 0.7 } }}
      exit={{ x: -5000, opacity: 0, transition: { duration: 0.7 } }}
    >
      <p className="self-start ml-5 text-3xl text-left text-green-600 border-b-2 border-green-600">
        Latest posts
      </p>
      {posts.map((post) => (
        <div key={post._id}>
          <Post
            title={post.title}
            date={post.postedAt}
            content={post.post}
            id={post._id}
            slug={post.slug}
          />
        </div>
      ))}
    </motion.div>
  );
};
export default Home;
