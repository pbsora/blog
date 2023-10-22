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
      className="block pb-3 border-b-2 border-zinc-500"
      onSubmit={submitComment}
    >
      <div className="">
        <label htmlFor="author" className="block mb-2 text-lg">
          Your name
        </label>
        <input
          type="text"
          id="author"
          name="author"
          className="w-full px-2 py-3 border border-black xl:w-2/4 rounded-xl"
          onChange={handleChange}
          value={message.author}
        />
      </div>
      <div className="mt-3 ">
        <label htmlFor="author" className="block mb-2 text-lg ">
          Comment
        </label>
        <textarea
          name="comment"
          id="comment"
          cols={30}
          rows={10}
          className="w-full px-2 py-3 border border-black rounded-xl"
          onChange={handleChange}
          value={message.comment}
        ></textarea>
      </div>
      <button
        type="submit"
        className="px-24 py-3 mt-3 duration-200 border border-black rounded-lg hover:bg-zinc-200"
      >
        New comment
      </button>
    </form>
  );
};
export default NewComment;
