"use client";

import { useState } from "react";
import { apiClient } from "@/src/lib/apiClients/ApiClients";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { ProblemLike, WhatToDiscardProblem } from "@/src/types/ApiData";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";
import { useSetModal } from "@/src/hooks/useSetModal";
import LikeButton from "@/src/components/LikeButton";

export default function ProblemLikeButton({ problem }: { problem: WhatToDiscardProblem }) {
	const [myLike, setMyLike] = useState<ProblemLike | null>(problem.myLike);
	const [likesCount, setLikesCount] = useState(problem.likesCount);

	const [loading, setLoading] = useState(false);

	const auth = useIsLoggedIn();
	const setModal = useSetModal();
	const toast = useToast();

	const handleClick = async () => {
		if (!auth) {
			return setModal("NotLoggedIn");
		}

		if (loading) {
			return null;
		}
		setLoading(true);

		try {
			if (myLike) {
				const response = await apiClient.delete(
					`/what_to_discard_problems/${problem.id}/likes/${myLike.id}`,
				);

				const data = response.data.what_to_discard_problem_like;

				setMyLike(data);
				setLikesCount(likesCount - 1);

				toast({
					title: "いいねを取り消しました",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				const response = await apiClient.post(`/what_to_discard_problems/${problem.id}/likes`);

				const data: ProblemLike = response.data.what_to_discard_problem_like;

				setMyLike(data);
				setLikesCount(likesCount + 1);

				toast({
					title: "いいねしました",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(error.status);
				console.error(error.message);
			}
			console.error(error);
			toast({
				title: "いいねの操作に失敗しました",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setLoading(false);
		}

		return null;
	};

	return (
		<LikeButton
			isLiked={Boolean(myLike)}
			likeCount={likesCount}
			handleClick={handleClick}
			isLoading={loading}
		/>
	);
}
