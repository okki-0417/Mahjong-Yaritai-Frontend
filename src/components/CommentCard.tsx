import { Link } from "react-router";

type CommentCardType = {
  user_id: number;
  user_name: string;
  created_at: string;
  content: string;
}

export default function CommentCard({user_id, user_name, created_at, content}: CommentCardType) {
  return (
    <div className="w-full py-3 px-2 font-semibold text-gray-700 border-b border-gray-300">
      <Link
        to={`/users/${user_id}`}
      >
        <div className="flex items-center lg:gap-2 gap-1">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src="https://placehold.jp/150x150.png" className="w-full h-full object-cover" />
          </div>
          <p>{user_name}</p>
        </div>
      </Link>

      <div className="font-sans font-normal text-sm px-1 mt-1">
        {new Date(created_at).toLocaleString()}
      </div>

      <div className="pl-1 mt-2">
        <p>{content}</p>

        {/* <LikeButton /> */}
      </div>
    </div>
  )
}
