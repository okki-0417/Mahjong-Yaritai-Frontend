import { useEffect, useState } from "react";
import { BASEURL } from "../../ApiConfig";
import WhatToDiscardProblemCard from "../../features/what-to-discard-problems/WhatToDiscardProblemCard";
import { Likes } from "../../features/what-to-discard-problems/WhatToDiscardProblemLikeButton";
import PopButton from "../../components/PopButton";
import ToggleWrapper from "../../components/ToggleWrapper";
import WhatToDiscardProblemCreateForm from "../../features/what-to-discard-problems/WhatToDiscardProblemCreateForm";

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

  hand1: number;
  hand2: number;
  hand3: number;
  hand4: number;
  hand5: number;
  hand6: number;
  hand7: number;
  hand8: number;
  hand9: number;
  hand10: number;
  hand11: number;
  hand12: number;
  hand13: number;
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
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchWhatToDiscardProblems = async () => {
      try {
        const response = await fetch(`${BASEURL}/what_to_discard_problems`, {
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        });

        const data: { what_to_discard_problems: WhatToDiscardProblem[] } =
          await response.json();

        setWhatToDiscardProblems(data.what_to_discard_problems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWhatToDiscardProblems();

    if (localStorage.getItem("isCreateFormOpen") === "open")
      setIsCreateFormOpen(true);
  }, []);

  useEffect(() => {
    isCreateFormOpen
      ? localStorage.setItem("isCreateFormOpen", "open")
      : localStorage.removeItem("isCreateFormOpen");
  }, [isCreateFormOpen]);

  return (
    <div className="max-w-4xl lg:mx-auto mx-4 mt-36">
      <h1 className="lg:text-5xl text-xl mt-12 font-bold">何切る問題</h1>
      <hr className="mt-3" />

      <p className="mt-6 lg:text-lg leading-relaxed flex flex-col gap-2">
        <span>
          ここでは様々な状況での最適な選択を考えながら、他のプレイヤーと意見を交換したり、自分の判断力を磨いたりできます。
        </span>
        <span>
          麻雀の奥深さを学びながら、より良い打牌選択を身につけましょう。
        </span>
      </p>

      <div className="mt-6">
        <PopButton
          value="＋"
          defaultClassName="btn-circle btn-main"
          onClick={() => setIsCreateFormOpen(!isCreateFormOpen)}
        />
      </div>

      <div>
        <ToggleWrapper
          flag={isCreateFormOpen}
          children={
            <WhatToDiscardProblemCreateForm
              setIsCreateFormOpen={setIsCreateFormOpen}
            />
          }
        />
      </div>

      {whatToDiscardProblems.map((problem, index) => (
        <WhatToDiscardProblemCard key={index} problem={problem} />
      ))}
    </div>
  );
}
