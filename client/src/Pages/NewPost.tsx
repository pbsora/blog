import useLocalStorage from "../Hooks/useLocalStorage";

const NewPost = () => {
  const { value } = useLocalStorage("token");

  return <div>{value}</div>;
};
export default NewPost;
