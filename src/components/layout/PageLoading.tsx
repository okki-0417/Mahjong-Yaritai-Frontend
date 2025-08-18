import Fallback from "@/src/components/Fallback";
import { Box } from "@chakra-ui/react";

export default function PageLoading() {
  return (
    <Box mt="20" h="full">
      <Fallback />
    </Box>
  );
}
