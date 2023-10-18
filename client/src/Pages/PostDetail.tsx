import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "ts-luxon";
import { FallingLines } from "react-loader-spinner";

interface Post {
  title: string;
  post: string;
  postedAt: string | Date;
}

/* type Props = {} */
const PostDetail = (/* props: Props */) => {
  const { slug } = useParams();
  const [load, setLoad] = useState<boolean>(true);
  const [post, setPost] = useState<Post>({
    title: "",
    post: "",
    postedAt: "",
  });
  useEffect(() => {
    console.log("montou");
    const getPost = async () => {
      const { data } = await axios({
        url: `/api/post/${slug}`,
        method: "get",
        withCredentials: true,
      });
      console.log(data);
      setPost(data);
      setLoad(false);
    };
    getPost();
  }, [slug]);

  if (load) {
    return (
      <div className="grid place-content-center h-screen ">
        <FallingLines color="white" />
      </div>
    );
  }

  return (
    <div className="w-screen md:px-16 lg:px-32 md:w-[80vw] lg:w-[70vw] xl:w-[60vw] bg-black  h-full text-white font-roboto px-5 py-5 flex flex-col gap-3 m-auto md:my-6 md:rounded-3xl">
      <h1 className="text-3xl">{post.title}</h1>
      <span className="border-b-2 border-white pb-3 font-extralight ">
        {DateTime.fromJSDate(
          typeof post.postedAt === "string"
            ? new Date(post.postedAt)
            : post.postedAt
        ).toLocaleString(DateTime.DATETIME_SHORT)}
      </span>
      <p className="font-light  line leading-8 text-lg">{post.post}</p>
    </div>
  );
};
export default PostDetail;
