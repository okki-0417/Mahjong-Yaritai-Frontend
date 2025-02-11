import { useState } from "react";
import { BASEURL } from "../../ApiConfig";
import LikeButton from "../../components/LikeButton";

export type Likes = {
  what_to_discard_problem_id: number;
  count: number;
  current_user_like_id: number | null;
}

export default function WhatToDiscardProblemLikeButton({likes}: {likes: Likes}) {
  if(!likes) return;

  const [likeCount, setLikeCount] = useState<number>(likes.count);
  const [likeId, setLikeId] = useState<number | null>(likes.current_user_like_id);
  const [liked, setLiked] = useState<boolean>(!!likeCount);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    if(loading) return;
    setLoading(true);

    try {
      if(!liked && !likeId) {
        const response = await fetch(`${BASEURL}/what_to_discard_problems/${likes.what_to_discard_problem_id}/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("CREATE: Response was not ok.")

        const data: {what_to_discard_problem_like: {id: number}} = await response.json();

        setLikeId(data.what_to_discard_problem_like.id);
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
      else if(liked && likeId){
        const response = await fetch(`${BASEURL}/what_to_discard_problems/${likes.what_to_discard_problem_id}/likes/${likeId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("DELETE: Response was not ok.")

        setLikeId(null);
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
      else {
        throw new Error("LikeState & LikeIdState are not consistent.");
      }
    }
    catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LikeButton liked={liked} likeCount={likeCount} handleClick={handleClick} />
  )
}
