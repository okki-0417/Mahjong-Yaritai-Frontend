"use client";

import { FiAlertTriangle } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import UserModal from "@/src/components/Modals/UserModal";
import {
  Button,
  Circle,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { z } from "zod";
import { schemas } from "@/src/zodios/api";
import useProblemDelete from "@/src/hooks/useProblemDelete";
import { Fragment, useContext } from "react";
import ProblemUpdateFormModal from "@/src/app/what-to-discard-problems/components/ProblemUpdateFormModal";
import { ProblemsContext } from "@/src/app/what-to-discard-problems/context-providers/ProblemsContextProvider";

export default function ProblemCardHeader({
  problem,
  myUserId,
}: {
  problem: z.infer<typeof schemas.WhatToDiscardProblem>;
  myUserId: number | null;
}) {
  const {
    isOpen: isUserModalOpen,
    onOpen: onUserModalOpen,
    onClose: onUserModalClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateFormOpen,
    onOpen: onUpdateFormOpen,
    onClose: onUpdateFormClose,
  } = useDisclosure();
  const isMyProblem = problem.user.id === myUserId;
  const { deleteProblem } = useProblemDelete(problem.id);
  const { setProblems } = useContext(ProblemsContext);

  return (
    <HStack justifyContent="space-between">
      <Button onClick={onUserModalOpen} colorScheme="" p="0">
        <HStack>
          <Circle overflow="hidden" size={["7", "9"]}>
            <Image
              src={problem.user.avatar_url || "/no-image.webp"}
              alt={problem.user.name}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Circle>
          <Text fontSize="sm">{problem.user.name}</Text>
        </HStack>
      </Button>

      {isMyProblem && (
        <Menu>
          <MenuButton as="button">
            <HiOutlineDotsHorizontal size={22} />
          </MenuButton>
          <MenuList>
            <Fragment>
              <MenuItem icon={<FiEdit3 size={18} color="black" />} onClick={onUpdateFormOpen}>
                <span className="text-primary">編集する</span>
              </MenuItem>

              <ProblemUpdateFormModal
                isOpen={isUpdateFormOpen}
                onClose={onUpdateFormClose}
                setProblems={setProblems}
                problem={problem}
              />
            </Fragment>
            {isMyProblem ? (
              <MenuItem icon={<AiOutlineDelete size={18} color="red" />} onClick={deleteProblem}>
                <span className="text-red-500">削除する</span>
              </MenuItem>
            ) : (
              <MenuItem icon={<FiAlertTriangle size={18} color="red" />}>
                <span className="text-red-500">通報する</span>
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      )}

      <UserModal
        user={problem.user}
        isOpen={isUserModalOpen}
        onClose={onUserModalClose}
        isFollowing={problem.user.is_following}
        currentUserId={myUserId}
      />
    </HStack>
  );
}
