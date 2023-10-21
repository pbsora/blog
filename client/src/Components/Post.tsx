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
    <div className="grid w-full grid-cols-4 px-5 py-3 m-auto border-2 border-l-4 rounded-lg shadow-xl font-roboto border-l-lime-500">
      <h1
        id="title"
        className="col-span-4 mb-3 text-3xl text-left md:col-span-2"
      >
        {title}
      </h1>
      <span className="col-span-4 text-lg text-left md:col-span-2 font-extralight ">
        {DateTime.fromJSDate(
          typeof date === "string" ? new Date(date) : date
        ).toLocaleString(DateTime.DATE_SHORT)}
      </span>
      <p className="col-span-4 text-left line-clamp-6">{content}</p>

      <Link
        to={`/post/${slug}`}
        className="col-span-4 py-3 mt-3 text-center duration-200 border-t-2 rounded cursor-pointer hover:bg-zinc-300"
      >
        Read more
      </Link>
    </div>
  );
};
export default Post;
