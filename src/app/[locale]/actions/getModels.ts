import { client } from "@/lib/sanity";

export async function getModelsById(subcategoryId: any) {
  console.log(subcategoryId);

  const query = `*[_type == "model" && subcategory._ref == $subcategoryId]`;

  // Run the query with the subcategory ID as a variable
  const params = {
    subcategoryId: subcategoryId,
  };

  try {
    const models = await client.fetch(query,params);
    console.log(models);

    return models;
  } catch (error) {
    console.error("Error fetching models:", error);
    return [];
  }
}
