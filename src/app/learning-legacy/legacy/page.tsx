import { LearningCategoriesList } from "@/src/app/learning/components/LearningCategoriesList";
import createApiPageClient from "@/src/lib/api/server";
import { Box, Container, Divider, Text } from "@chakra-ui/react";

export const dynamic = "force-static";

export default async function LegacyLearningPage() {
  const apiPageClient = await createApiPageClient();

  try {
    const response = await apiPageClient.getLearningCategories();
    const categories = response.learning_categories;
    return (
      <Container mt={["12", "20"]} maxW="4xl" px="2">
        <Text as="h1" fontSize={["4xl", "5xl"]} fontWeight="bold">
          麻雀ハジメタイ
        </Text>
        <Divider />

        <Box mt="8">
          <LearningCategoriesList categories={categories} />
        </Box>
      </Container>
    );
  } catch (error) {
    return <div>Error fetching learning categories: {error.message}</div>;
  }
}
