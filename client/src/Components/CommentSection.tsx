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
    <div id="comments">
      <div className="flex justify-around items-center">
        <p className="text-2xl text-center mb-6">Comments</p>
        <button
          className="border-2 border-black p-3 rounded-xl hover:bg-zinc-200"
          onClick={() => setShowNewComment(true)}
        >
          New comment
        </button>
      </div>
      {showNewComment && (
        <NewComment id={id} setShowNewComment={setShowNewComment} />
      )}
      <div ref={parent} className="text-center mt-12 text-lg">
        {comments.length !== 0
          ? comments.map((comment) => (
              <Comment
                content={comment.content}
                author={comment.author}
                createdAt={comment.createdAt}
              />
            ))
          : "No comments here"}
      </div>
    </div>
  );
};
export default CommentSection;
