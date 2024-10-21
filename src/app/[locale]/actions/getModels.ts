import { client } from "@/lib/sanity";

export async function getModelsById(subcategoryId: any) {
    console.log(subcategoryId);
    
  const query = `*[_type == "option"]`;

  // Run the query with the subcategory ID as a variable
  const params = {
    subcategoryId: subcategoryId,
  };

  try {
    const models = await client.fetch(query);
    console.log(models);
    
    return models;
  } catch (error) {
    console.error("Error fetching models:", error);
    return [];
  }
}
