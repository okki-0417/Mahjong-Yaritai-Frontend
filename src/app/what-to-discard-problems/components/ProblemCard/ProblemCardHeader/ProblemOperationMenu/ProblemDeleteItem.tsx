import { WhatToDiscardProblem } from "@/src/generated/graphql";
import { MenuItem } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  problem: WhatToDiscardProblem;
};

export default function ProblemDeleteItem({ problem }: Props) {
  const deleteProblem = () => {
    // 削除処理をここに実装
    console.log("問題を削除しました");
  };

  return (
    <MenuItem icon={<AiOutlineDelete size={18} color="red" />} onClick={deleteProblem}>
      <span className="text-red-500">削除する</span>
    </MenuItem>
  );
}
