import { LearningCategoriesList } from "@/src/features/learning/components/LearningCategoriesList";
import createApiPageClient from "@/src/lib/api/server";

export default async function LearningCategoriesSection() {
  const apiPageClient = await createApiPageClient();

  try {
    await setTimeout(() => null, 3000);
    const response = await apiPageClient.getLearningCategories();
    const categories = response.learning_categories;

    return <LearningCategoriesList categories={categories} />;
  } catch (error) {
    return <div>{error.message || "Error loading categories"}</div>;
  }
}
