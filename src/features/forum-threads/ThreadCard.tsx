import { Link } from "react-router";
import { ForumThread } from "../../pages/forum-threads/page";

export default function ThreadCard({
  forumThread,
}: {
  forumThread: ForumThread;
}) {
  return (
    <div className="hover:bg-slate-600">
      <Link to={`/forum-threads/${forumThread.id}`} className="p-2 block">
        <div className="text-sm text-slate-300 font-sans font-light tracking-wider">
          {new Date(forumThread.created_at).toLocaleString()}
        </div>
        <div className="mt-2 text-white text-lg">{forumThread.topic}</div>
        <div className="flex gap-1 items-center justify-end">
          <span>コメント数 :</span>
          <span className="font-sans">{`${0}`}</span>
        </div>
      </Link>
    </div>
  );
}
