import { useEffect, useState } from "react";
import { apiClient } from "../../ApiConfig";
import WhatToDiscardProblemCard from "../../features/what-to-discard-problems/WhatToDiscardProblemCard";
import { Likes } from "../../features/what-to-discard-problems/WhatToDiscardProblemLikeButton";
import WhatToDiscardProblemToggleForm from "../../features/what-to-discard-problems/WhatToDiscardProblemCreateFormToggleForm";

export type WhatToDiscardProblem = {
  id: number;
  round: number;
  turn: number;
  wind: number;
  dora: number;
  point_east: number;
  point_south: number;
  point_west: number;
  point_north: number;

  hands: {
    value: number;
  }[];

  tsumo: number;
  created_at: string;

  user: {
    id: number;
    name: string;
  };

  likes: Likes;
};

export default function WhatToDiscardProblems() {
  const [whatToDiscardProblems, setWhatToDiscardProblems] = useState<
    WhatToDiscardProblem[]
  >([]);

  useEffect(() => {
    const fetchWhatToDiscardProblems = async () => {
      try {
        const response = await apiClient.get(`/what_to_discard_problems`);

        const data = response.data;

        setWhatToDiscardProblems(data.what_to_discard_problems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWhatToDiscardProblems();
  }, []);

  return (
    <div className="max-w-4xl lg:mx-auto mx-4 mt-36">
      <h1 className="lg:text-5xl text-3xl mt-12 font-bold">何切る問題</h1>
      <hr className="mt-3" />

      <p className="mt-6 text-lg leading-relaxed flex flex-col gap-2">
        <span>
          ここでは様々な状況での最適な選択を考えながら、他のプレイヤーと意見を交換したり、自分の判断力を磨いたりできます。
        </span>
        <span>
          麻雀の奥深さを学びながら、より良い打牌選択を身につけましょう。
        </span>
      </p>

      <WhatToDiscardProblemToggleForm />

      {whatToDiscardProblems.map((problem, index) => (
        <WhatToDiscardProblemCard key={index} problem={problem} />
      ))}
    </div>
  );
}
