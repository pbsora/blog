import { Link } from "react-router-dom";

/* type Props = {}; */
const Home = (/* props: Props */) => {
  return (
    <div className="m-auto bg-black text-white h-full text-center">
      <h1>Homepage</h1>
      <Link to={"/post/teste"}>To post</Link>
    </div>
  );
};
export default Home;
