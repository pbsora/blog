import { UserContext, ILogged } from "../Components/Context/Context";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const NewPost = () => {
  const { logged } = useContext(UserContext) as ILogged;
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate]);

  return (
    <div className="w-[90vw] md:w-[70vw] lg:w-[60vw]  h-[80vh] m-auto mt-6 font-roboto  ">
      <div className="block w-3/4 m-auto mt-6 ">
        <label htmlFor="title" className="block mb-4 text-3xl">
          Title
        </label>
        <input
          type="text"
          name="title"
          /* value={login.username}
            onChange={handleChange} */
          className="w-full px-2 py-3 text-lg border-2 border-black rounded-xl focus:outline-blue-500"
        />
      </div>
      <div className="block w-full m-auto mt-6">
        <label htmlFor="post" className="block mb-4 text-3xl">
          Post
        </label>
        <Editor apiKey="vfpr06ha51lx0qywfwhsvft8cshsir5e1byrm03lve2qc5ds" />
      </div>
    </div>
  );
};
export default NewPost;
