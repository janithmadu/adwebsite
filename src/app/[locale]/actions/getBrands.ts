import { client } from "@/lib/sanity";

export async function getbrandsById(subcategoryId: string) {
 
    
  const query = `*[_type == "brand" && subcategory._ref == $categoryId] `;

  // Run the query with the subcategory ID as a variable
  const params = {
    categoryId: subcategoryId,
  };

  try {
    const brands = await client.fetch(query, params);
    
    return brands;
  } catch (error) {
    
    return [];
  }
}
