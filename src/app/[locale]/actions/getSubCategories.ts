import { client } from "@/sanity/lib/client";

export const revalidate = 1;

export const getAllSubCategories = async () => {
  const query = `*[_type == "subcategory"]{
    title,
    slug,
    "category": category->{
      title,
      slug,
      description,
      "imageUrl": image.asset->url
    },
    "imageUrl": image.asset->url,
    description,
    options[]->{
      title,
      slug,
      values[] {
        en,
        ar
      }
    }
  }`

  const data = await client.fetch(query);

  return data;
};

export const getSubCategoriesByID = async (id: any) => {};

export const getSubCategoryOptions = async () =>{
  const query = `*[_type == "option"]{
    title {
      en,
      ar
    },
    slug,
    values[] {
      en,
      ar
    }
  }`;
  
  const data = await client.fetch(query);

  return data;
  
}
