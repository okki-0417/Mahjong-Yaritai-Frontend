import AccordionCardBig from "@/src/components/AccordingCards/AccordionCardBig";
import AccordionCardMid from "@/src/components/AccordingCards/AccordionCardMid";
import { useState } from "react";

export default function LearningLists() {
  return (
    <div className="mt-12 flex flex-col gap-2">
      <BeforeStart />
      <DuringGame />
      <AfterGame />
    </div>
  );
}

const BeforeStart = () => {
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);

  return (
    <AccordionCardBig
      opened={opened}
      bgColor="bg-orange-500"
      handleClick={() => setOpened(!opened)}
      text={"始める準備"}
    >
      <AccordionCardMid
        opened={opened2}
        bgColor="bg-orange-400"
        handleClick={() => setOpened2(!opened2)}
        text={"親を決める"}
      />

      <AccordionCardMid
        opened={opened2}
        bgColor="bg-orange-400"
        handleClick={() => setOpened2(!opened2)}
        text={"山を準備する"}
      />

      <AccordionCardMid
        opened={opened2}
        bgColor="bg-orange-400"
        handleClick={() => setOpened2(!opened2)}
        text={"手牌を準備する"}
      />

      <AccordionCardMid
        opened={opened2}
        bgColor="bg-orange-400"
        handleClick={() => setOpened2(!opened2)}
        text={"点棒を準備する"}
      />
    </AccordionCardBig>
  );
};

const DuringGame = () => {
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);

  return (
    <AccordionCardBig
      opened={opened}
      bgColor="bg-blue-500"
      handleClick={() => setOpened(!opened)}
      text={"ゲーム中"}
    >
      <AccordionCardMid
        opened={opened2}
        bgColor="bg-blue-400"
        handleClick={() => setOpened2(!opened2)}
        text={"親から始める"}
      />
    </AccordionCardBig>
  );
};

const AfterGame = () => {
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);

  return (
    <AccordionCardBig
      opened={opened}
      bgColor="bg-red-500"
      handleClick={() => setOpened(!opened)}
      text={"局の終わり"}
    >
      <AccordionCardMid
        opened={opened2}
        bgColor="bg-red-400"
        handleClick={() => setOpened2(!opened2)}
        text={"点数を計算する"}
      />
    </AccordionCardBig>
  );
};
