import { client } from "@/sanity/lib/client";

export async function getHeroImages() {
  const query = `*[_type == "heroImage"] {
    imageName,
    altText,
    "imageUrl": image.asset->url,
    createdAt // Fetch the createdAt field
  } | order(createdAt asc)`; // Order by createdAt in ascending order

  try {
    const heroImages = await client.fetch(query);
    
    return heroImages;
  } catch (error) {
  
  }
}
