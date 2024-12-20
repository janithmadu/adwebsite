import { client } from "@/sanity/lib/client";

export const revalidate = 1;

export async function getlimitedCategory() {
  const quary = `*[_type == "category"][0...7]`;
  const data = await client.fetch(quary);

  return data;
}

export async function getlimitedCategoryFooter() {
  const quary = `*[_type == "category"][0...4]`;
  const data = await client.fetch(quary);

  return data;
}

export async function getAllCategory() {
  const quary = `*[_type == "category"] {
  "id": _id,
  title {
    en,
    ar
  },
  slug {
    current
  },
  "imageUrl": image.asset->url, // Directly gets the image URL
  description {
    en,
    ar
  },
  price
}
`;
  const data = await client.fetch(quary);

  return data;
}

export const getCategoryAndSubcategory =  async()=>{

  const quary = `*[_type == "category"] {
  title, 
  slug, 
  "imageUrl": image.asset->url, // Directly gets the image URL
  description,
  "subcategories": *[_type == "subcategory" && references(^._id)] {
    _id,
    title,
    slug,
    "imageUrl": image.asset->url, // Directly gets the image URL
    description
  }
}

`

const data = await client.fetch(quary);
return data

}
