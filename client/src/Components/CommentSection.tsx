import { useEffect, useState } from "react";
import Comment from "./CommentItem";
import axios from "axios";
import NewComment from "./NewComment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IComment } from "./Interfaces";

type Props = { id: string };
const CommentSection = ({ id }: Props) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [showNewComment, setShowNewComment] = useState(false);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    const getComments = async () => {
      const { data } = await axios({
        method: "get",
        url: `/api/post/${id}/comment`,
        withCredentials: true,
      });
      console.log(data);
      setComments(data);
    };
    getComments();
  }, [id, showNewComment]);
  console.log(comments);

  return (
    <div id="comments" ref={parent}>
      <div className="flex justify-around items-start">
        <p className="text-2xl text-center mb-6">Comments</p>
        <button
          className="border-2 border-black p-3 rounded-xl hover:bg-zinc-200 duration-200"
          onClick={() => setShowNewComment(true)}
        >
          New comment
        </button>
      </div>
      {showNewComment && (
        <NewComment id={id} setShowNewComment={setShowNewComment} />
      )}

      {comments.length !== 0 ? (
        comments.map((comment) => (
          <Comment
            content={comment.content}
            author={comment.author}
            createdAt={comment.createdAt}
          />
        ))
      ) : (
        <p className="text-xl block m-auto text-center mt-10">
          No comments here
        </p>
      )}
    </div>
  );
};
export default CommentSection;
