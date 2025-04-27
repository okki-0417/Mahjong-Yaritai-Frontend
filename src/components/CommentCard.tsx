import { Box, Button } from "@chakra-ui/react";
import { MdOutlineReply } from "react-icons/md";
import { Link } from "react-router";

type CommentCardType = {
  comment_id: number;
  user_id: number;
  user_name: string;
  created_at: string;
  content: string;
  handleReplyClick: (commentId: string) => any;
};

export default function CommentCard({
  comment_id,
  user_id,
  user_name,
  created_at,
  content,
  handleReplyClick,
}: CommentCardType) {
  const handleClick = () => {
    handleReplyClick(String(comment_id));
  };

  return (
    <div className="w-full py-3 px-2 font-semibold text-gray-700 border-b border-gray-300">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Link to={`/users/${user_id}`}>
          <div className="flex items-center lg:gap-2 gap-1">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                src="https://placehold.jp/150x150.png"
                className="w-full h-full object-cover"
              />
            </div>
            <p>{user_name}</p>
          </div>
        </Link>

        <Button fontSize="xs" onClick={handleClick} bgColor="inherit">
          返信する
          <MdOutlineReply size={15} />
        </Button>

        {/* <Button fontSize="xs">削除する</Button> */}
      </Box>

      <div className="font-sans font-normal text-sm px-1 mt-1">
        {new Date(created_at).toLocaleString()}
      </div>

      <div className="pl-1 mt-2">
        <p>{content}</p>

        {/* <LikeButton /> */}
      </div>
    </div>
  );
}
