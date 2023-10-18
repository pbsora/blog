import { useState, useEffect } from "react";

import Post from "../Components/Post";
import axios from "axios";
import { motion } from "framer-motion";

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
  console.log(posts);

  return (
    <motion.div
      className="flex  flex-col justify-center items-center gap-8 pt-6 mb-10 py-3 px-5 w-[95vw] md:w-[80vw] xl:w-[70vw] 2xl:max-w-[60vw] m-auto font-roboto"
      initial={{ x: -10000 }}
      animate={{ x: 0, transition: { duration: 0.5 } }}
      exit={{ x: 2000, opacity: 0, transition: { duration: 0.5 } }}
    >
      <p className="text-left  self-start ml-5 text-3xl text-green-600 border-b-2 border-green-600">
        Latest posts
      </p>
      {posts.map((post) => (
        <Post
          title={post.title}
          date={post.postedAt}
          content={post.post}
          id={post._id}
          slug={post.slug}
        />
      ))}
    </motion.div>
  );
};
export default Home;
