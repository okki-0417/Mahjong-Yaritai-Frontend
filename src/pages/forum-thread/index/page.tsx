import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import { Link, useNavigate } from "react-router";
import { BASEURL } from "../../../api-config";

type ForumThread = {
  id: number;
  topic: string;
};

export default function IndexForumThreads() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [forumThreads, setForumThreads] = useState<ForumThread[]>();

  useEffect(() => {
    if (auth === false) {
      navigate("/auth/login");
    }
    console.log(`ForumThreadIndex: ${auth}`);

    const getForumThreads = async () => {
      const response = await fetch(`${BASEURL}/forum_threads`);

      const data = await response.json();
      console.log(`DATA: ${JSON.stringify(data)}`);

      setForumThreads(data.forum_threads);
    };

    getForumThreads();
  }, [auth]);

  return (
    <div>
      {forumThreads !== undefined && forumThreads.length > 0 ? (
        <ul>
          {forumThreads.map((forumThread) => {
            return (
              <li className="text-white">{JSON.stringify(forumThread)}</li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center text-white mt-16">
          <p className="text-4xl">
            スレッドはまだありません。
            <br />
            スレッドを立ててみましょう。
          </p>
          <Link
            to="/forum-threads/new"
            className="inline-block text-xl mt-4 underline"
          >
            スレッドを作る
          </Link>
        </div>
      )}
    </div>
  );
}
