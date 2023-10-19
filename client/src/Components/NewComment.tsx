import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {
  id: string;
  setShowNewComment: React.Dispatch<React.SetStateAction<boolean>>;
};
const NewComment = ({ id, setShowNewComment }: Props) => {
  const [message, setMessage] = useState({
    author: "",
    comment: "",
  });

  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = await axios({
      method: "post",
      url: `/api/post/${id}/comment`,
      withCredentials: true,
      data: {
        author: message.author,
        content: message.comment,
      },
    });
    if (comment.status === 201) {
      setShowNewComment(false);
      /* setComments((prev) => ({
        ...prev,
        message,
      })); */
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      className="block border-b-2 border-zinc-500 pb-3"
      onSubmit={submitComment}
    >
      <div className="">
        <label htmlFor="author" className="block mb-2 text-lg">
          Your name
        </label>
        <input
          type="text"
          name="author"
          className="border border-black w-full xl:w-2/4  py-3 px-2 rounded-xl"
          onChange={handleChange}
          value={message.author}
        />
      </div>
      <div className=" mt-3">
        <label htmlFor="author" className="block mb-2 text-lg">
          Comment
        </label>
        <textarea
          name="comment"
          id="comment"
          cols={30}
          rows={10}
          className="border border-black rounded-xl w-full py-3 px-2"
          onChange={handleChange}
          value={message.comment}
        ></textarea>
      </div>
      <button
        type="submit"
        className="border border-black py-3 px-24 rounded-lg mt-3 hover:bg-zinc-200"
      >
        New comment
      </button>
    </form>
  );
};
export default NewComment;
