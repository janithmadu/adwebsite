import { client } from "@/sanity/lib/client";

export const revalidate = 1;

export const getAllSubCategories = async () => {
  const quary = `*[_type == "subcategory"]{
  title,
  slug,
  "category": category->{
    title,
    slug,
    description,
    "imageUrl": image.asset->url
  },
  "imageUrl": image.asset->url,
  description
}


`;

  const data = await client.fetch(quary);

  return data;
};

export const getSubCategoriesByID = async (id: any) => {};
