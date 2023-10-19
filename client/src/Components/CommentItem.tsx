import { DateTime } from "ts-luxon";

type Props = {
  content: string;
  author: string;
  createdAt: string | Date;
};
const Comment = ({ content, author, createdAt }: Props) => {
  return (
    <div className="flex flex-col gap-3 border-b-2 border-zinc-500 py-5 text-left">
      <div className="flex gap-6">
        <h2 className="text-xl">{author}</h2>
        <span className="text-lg">
          {DateTime.fromJSDate(
            typeof createdAt === "string" ? new Date(createdAt) : createdAt
          ).toLocaleString(DateTime.DATETIME_SHORT)}
        </span>
      </div>
      <div className="text-lg">{content}</div>
    </div>
  );
};
export default Comment;
