import ParticipatedMahjongSessionsSection from "@/src/app/me/participated-mahjong-sessions/components/ParticipatedMahjongSessionsSection";
import Fallback from "@/src/components/fallbacks/Fallback";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from "@chakra-ui/react";
import { Suspense } from "react";

export default function GameRecordsPage() {
  return (
    <Container maxW="container.xl" py={4} px="0">
      <Box px="2">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/me">マイページ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage>麻雀戦績</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Container mt="4" maxW="container.md" px="1">
        <Suspense fallback={<Fallback />}>
          <ParticipatedMahjongSessionsSection />
        </Suspense>
      </Container>
    </Container>
  );
}
