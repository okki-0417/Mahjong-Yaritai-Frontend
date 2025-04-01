import { Link } from "react-router";

export type PaginationType = {
  total_pages: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  first_page: number;
  last_page: number;
};

export default function Pagination({
  pagination,
}: {
  pagination: PaginationType | null;
}) {
  if (!pagination) return;

  return (
    <div className="flex gap-1 items-center justify-center w-full font-sans">
      <div className="w-20 min-h-1 flex justify-center">
        {pagination.prev_page && (
          <Link
            to={`?page=${pagination.prev_page}`}
            className="px-4 py-2 border rounded border-white hover:bg-gray-600"
          >
            前へ
          </Link>
        )}
      </div>

      <div className="flex items-center h-10">
        <div className="w-10">
          {pagination.first_page != pagination.current_page && (
            <Link
              to={`?page=${pagination.next_page}`}
              className="w-full leading-10 text-center aspect-square rounded-full inline-block"
            >
              {pagination.first_page}
            </Link>
          )}
        </div>

        {pagination.prev_page &&
          pagination.prev_page - 1 > pagination.first_page && (
            <div className="flex items-end">
              <span>...</span>
            </div>
          )}

        {pagination.prev_page != pagination.first_page && (
          <Link
            to={`?page=${pagination.prev_page}`}
            className="w-10 leading-10 text-center aspect-square rounded-full inline-block"
          >
            {pagination.prev_page}
          </Link>
        )}

        <div className="w-10 leading-10 text-center aspect-square rounded-full border border-white">
          {pagination.current_page}
        </div>

        {pagination.next_page != pagination.last_page && (
          <Link
            className="w-10 flex justify-center"
            to={`?page=${pagination.next_page}`}
          >
            {pagination.next_page}
          </Link>
        )}

        {pagination.next_page &&
          pagination.next_page + 1 < pagination.last_page && (
            <div className="flex items-end">
              <span>...</span>
            </div>
          )}

        <div className="w-10">
          {pagination.last_page != pagination.current_page && (
            <Link
              to={`?page=${pagination.last_page}`}
              className="w-full leading-10 text-center aspect-square rounded-full inline-block"
            >
              {pagination.last_page}
            </Link>
          )}
        </div>
      </div>

      <div className="w-20 min-h-1 flex justify-center">
        {pagination.next_page && (
          <Link
            to={`?page=${pagination.next_page}`}
            className="px-4 py-2 border rounded border-white hover:bg-gray-600"
          >
            次へ
          </Link>
        )}
      </div>
    </div>
  );
}
