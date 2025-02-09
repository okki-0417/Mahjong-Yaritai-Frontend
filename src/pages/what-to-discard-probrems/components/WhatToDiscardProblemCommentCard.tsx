import { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function WhatToDiscardProblemCommentCard() {
  const [liked, setLiked] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className="py-3 px-2 font-semibold text-gray-700 border-b border-gray-300">
      <button
        onClick={() => {navigate("/users/1")}}
      >
      <div className="flex items-center gap-1">
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <img src="https://placehold.jp/150x150.png" className="w-full h-full object-cover" />
        </div>

        <p>村井皇樹</p>
      </div>
    </button>

      <div className="pl-1 mt-2">
        <p>
          この何切る問題では、安全牌がない状況で攻めるか守るかの判断が鍵になります。形としてはリーチも考えられますが、点数状況や他家の捨て牌を見て慎重に判断すべきでしょう。
        </p>

        <button onClick={() => {setLiked(!liked)}} className="mt-1">
          <div className="flex items-center gap-1">
            {liked ?
              <FaThumbsUp color="#f765d6" size={15} /> :
              <FaRegThumbsUp color="#333" size={15}/>}
            <div className="font-sans font-semibold text-base">13</div>
          </div>
        </button>
      </div>
    </div>
  )
}
