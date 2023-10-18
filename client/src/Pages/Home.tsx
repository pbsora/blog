import { useState, useEffect } from "react";
import { FallingLines } from "react-loader-spinner";

import Post from "../Components/Post";
import axios from "axios";

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
  console.log(posts);

  if (load) {
    return (
      <div className="grid place-content-center h-screen ">
        <FallingLines color="white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 pt-6 mb-10">
      {posts.map((post) => (
        <Post
          title={post.title}
          date={post.postedAt}
          content={post.post}
          id={post._id}
          slug={post.slug}
        />
      ))}
    </div>
  );
};
export default Home;
