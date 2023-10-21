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

      setComments(data);
    };
    getComments();
  }, [id, showNewComment]);

  return (
    <div id="comments" ref={parent}>
      <div className="flex items-start justify-around">
        <p className="mb-6 text-2xl text-center">Comments</p>
        <button
          className="p-3 duration-200 border-2 border-black rounded-xl hover:bg-zinc-200"
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
        <p className="block m-auto mt-10 text-xl text-center">
          No comments here
        </p>
      )}
    </div>
  );
};
export default CommentSection;
