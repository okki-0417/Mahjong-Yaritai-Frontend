import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import PopButton from "./PopButton";

type LikeButtonType = {
  liked: boolean,
  likeCount: number,
  handleClick: () => void,
}

export default function LikeButton({liked, likeCount, handleClick}: LikeButtonType) {
  return (
    <PopButton
      value={
      <div onClick={handleClick} className="mt-1 w-10">
        <div className="flex items-center gap-1">
          {liked ?
            <FaThumbsUp color="#f765d6" size={24} /> :
            <FaRegThumbsUp color="#333" size={24}/>}
          <div className="font-sans font-semibold text-lg">{likeCount}</div>
        </div>
      </div>}
    />
  )
}
