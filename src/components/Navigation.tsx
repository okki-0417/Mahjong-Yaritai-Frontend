"use client";

import { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { GiThink } from "react-icons/gi";
import {
	Box,
	Button,
	Center,
	Checkbox,
	Circle,
	Container,
	Flex,
	HStack,
	Image,
	List,
	Text,
	UnorderedList,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import useIsLoggedIn from "@/src/hooks/useIsLoggedIn";

export default function Navigation() {
	const [checked, setChecked] = useState(false);
	const auth = useIsLoggedIn();

	return (
		<>
			<Box as="header" position="fixed" w="full" zIndex="50">
				<Center as="nav" bgColor="gray.900" h="20" position="relative">
					<Container maxW="5xl">
						<HStack justifyContent={["center", "space-between"]}>
							<Link href="/">
								<HStack>
									<Circle overflow="hidden">
										<Image src="/logo.webp" alt="麻雀好きが集まる場所" boxSize="10" />
									</Circle>
									<Text fontWeight="bold" fontSize={["2xl", "3xl"]}>
										麻雀ヤリタイ
									</Text>
								</HStack>
							</Link>

							<HStack display={["none", "none", "flex"]} gap="5">
								<Link href="/what-to-discard-problems">
									<HStack gap="1">
										<GiThink size={25} color="white" />
										<Text fontSize="lg">何切る問題</Text>
									</HStack>
								</Link>

								{!auth && (
									<Flex gap={1}>
										<Link href="/auth/login">
											<Button colorScheme="pink">ログイン</Button>
										</Link>
										<Link href="/authorization-session">
											<Button colorScheme="blue">新規登録</Button>
										</Link>
									</Flex>
								)}
							</HStack>

							<button
								className="absolute z-50 inset-y-0 my-auto right-8 size-8"
								onClick={() => setChecked(!checked)}>
								<Checkbox hidden defaultChecked={checked} />

								<VStack h="full">
									<Box
										className={`w-full h-1 bg-white transition-all ${checked && "rotate-45 translate-y-3"}`}
									/>
									<Box className={`w-full h-1 bg-white ${checked && "hidden"}`} />
									<Box
										className={`w-full h-1 bg-white transition-all ${checked && "-rotate-45"}`}
									/>
								</VStack>
							</button>
						</HStack>
					</Container>
				</Center>

				<Box
					as="nav"
					position="fixed"
					top="0"
					right="0"
					w="xs"
					shadow="dark-lg"
					className={`h-screen bg-base transition-all ${!checked && "translate-x-full"}`}>
					<Container maxW="xs" mt="20" px="8">
						<UnorderedList listStyleType="none">
							<VStack alignItems="start">
								<List>
									<label htmlFor="profile" className="cursor-pointer">
										<HStack>
											<Checkbox id="profile" hidden className="peer" />

											<Text className="text-lg inline-flex items-center gap-1">プロフィール</Text>
											<div className="w-fit ml-1 inline-block peer-checked:hidden">
												<IoIosArrowBack />
											</div>
											<div className="w-fit ml-1 hidden peer-checked:inline-block">
												<IoIosArrowDown />
											</div>
										</HStack>
									</label>

									<ul className="h-0 overflow-hidden peer-checked:h-auto ml-4">
										{/* <Link href="profile">
                      <li className="flex gap-1 items-center">
                        <FaAngleRight size={12} />
                        <span>プロフィール</span>
                      </li>
                    </Link> */}
										{/* <Link href="profile/edit">
											<li className="flex gap-1 items-center">
												<FaAngleRight size={12} />
												<span>編集</span>
											</li>
										</Link> */}
									</ul>
								</List>
								<li>
									<input id="what-to-discard-problems" type="checkbox" className="hidden peer" />
									<label
										htmlFor="what-to-discard-problems"
										className="text-lg inline-flex items-center gap-1">
										<span>何切る問題</span>
									</label>
									<div className="w-fit ml-1 inline-block peer-checked:hidden">
										<IoIosArrowBack />
									</div>
									<div className="w-fit ml-1 hidden peer-checked:inline-block">
										<IoIosArrowDown />
									</div>
									<ul className="h-0 overflow-hidden peer-checked:h-auto ml-4">
										<Link href="what-to-discard-problems">
											<li className="flex gap-1 items-center">
												<FaAngleRight size={12} />
												<span>一覧</span>
											</li>
										</Link>
										{/* <Link href="what-to-discard-problems/new">
											<li className="flex gap-1 items-center">
												<FaAngleRight size={12} />
												<span>新規作成</span>
											</li>
										</Link> */}
									</ul>
								</li>
							</VStack>
						</UnorderedList>
					</Container>
				</Box>
			</Box>
		</>
	);
}
