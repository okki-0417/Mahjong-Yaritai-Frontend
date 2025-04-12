import { useContext, useState } from "react";
import { BASEURL } from "../../ApiConfig";
import LikeButton from "../../components/LikeButton";
import { AuthStateContext } from "../../contexts/AuthStateContextProvider";
import { ToastContext } from "../../contexts/ToastContextProvider";
import { ModalContext } from "../../contexts/ModalContextProvider";

export type Likes = {
  what_to_discard_problem_id: number;
  count: number;
  current_user_like_id: number | null;
};

export default function WhatToDiscardProblemLikeButton({
  likes,
}: {
  likes: Likes;
}) {
  if (!likes) return;

  const [likeCount, setLikeCount] = useState<number>(likes.count);
  const [likeId, setLikeId] = useState<number | null>(
    likes.current_user_like_id,
  );
  const [liked, setLiked] = useState<boolean>(!!likes.current_user_like_id);
  const [loading, setLoading] = useState<boolean>(false);

  const { auth } = useContext(AuthStateContext);
  const { setToast } = useContext(ToastContext);
  const { setModalName } = useContext(ModalContext);

  const handleClick = async () => {
    if (!auth) {
      setModalName("NotLoggedIn");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      if (!liked && !likeId) {
        const response = await fetch(
          `${BASEURL}/what_to_discard_problems/${likes.what_to_discard_problem_id}/likes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error();
        }

        const data: { what_to_discard_problem_like: { id: number } } =
          await response.json();

        setLikeId(data.what_to_discard_problem_like.id);
        setLiked(true);
        setLikeCount(likeCount + 1);
      } else if (liked && likeId) {
        const response = await fetch(
          `${BASEURL}/what_to_discard_problems/${likes.what_to_discard_problem_id}/likes/${likeId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error();
        }

        setLikeId(null);
        setLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        throw new Error();
      }
    } catch (error) {
      setToast({ type: "error", message: "いいね に失敗しました。" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LikeButton
        liked={liked}
        likeCount={likeCount}
        handleClick={handleClick}
      />
      {/* {modalVisible && <NotLoggedInModal />} */}
    </div>
  );
}
