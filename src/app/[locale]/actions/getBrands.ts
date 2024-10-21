import { client } from "@/lib/sanity";

export async function getbrandsById(subcategoryId: any) {
 
    
  const query = `*[_type == "brand" && subcategory._ref == $categoryId] `;

  // Run the query with the subcategory ID as a variable
  const params = {
    categoryId: subcategoryId,
  };

  try {
    const brands = await client.fetch(query, params);
    
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}
