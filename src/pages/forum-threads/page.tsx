import { useEffect, useState } from "react";
import { pageApiClient } from "../../ApiConfig";
import ThreadCard from "../../features/forum-threads/ThreadCard";
import { useSearchParams } from "react-router";
import Pagination, { PaginationType } from "../../components/Pagination";

export type ForumThread = {
  id: number;
  topic: string;
  created_at: string;

  pagination: {
    next_page: string;
    prev_page: string;
  };
};

export default function ForumThreads() {
  const [forumThreads, setForumThreads] = useState<ForumThread[] | null>(null);
  const [pagination, setPagination] = useState<PaginationType | null>(null);

  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");

  useEffect(() => {
    const fetchForumThreads = async () => {
      const response = await pageApiClient.get(
        `/forum_threads?page=${page || 1}`,
      );
      setForumThreads(response.data.forum_threads);
      setPagination(response.data.pagination);
    };

    fetchForumThreads();
  }, [page]);

  return (
    <div className="max-w-4xl lg:mx-auto mx-4 mt-36">
      <h1 className="lg:text-5xl text-xl mt-12 font-bold">スレッド</h1>
      <hr className="mt-3 mb-20" />

      <main>
        <div>
          {forumThreads && (
            <div className="divide-y border rounded-sm">
              {forumThreads.map((thread) => {
                return <ThreadCard forumThread={thread} />;
              })}
            </div>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <Pagination pagination={pagination} />
        </div>
      </main>
    </div>
  );
}
