import { DateTime } from "ts-luxon";
import { Link } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  content: string;
  date: Date | string;
  slug: string;
};
const Post = ({ title, content, date, slug }: Props) => {
  return (
    <div className="grid grid-cols-4 font-roboto py-3 px-5 shadow-xl  m-auto rounded-lg border-2  border-l-4 border-l-lime-500">
      <h1
        id="title"
        className="col-span-4 text-left md:col-span-2 text-3xl mb-3"
      >
        {title}
      </h1>
      <span className="col-span-4 text-left  md:col-span-2 text-lg font-extralight ">
        {DateTime.fromJSDate(
          typeof date === "string" ? new Date(date) : date
        ).toLocaleString(DateTime.DATE_SHORT)}
      </span>
      <p className="col-span-4 text-left line-clamp-4">{content}</p>
      <button className="col-span-4 text-center border-t-2  mt-3 py-3 cursor-pointer">
        <Link to={`/post/${slug}`}>Read more</Link>
      </button>
    </div>
  );
};
export default Post;
