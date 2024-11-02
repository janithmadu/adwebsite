import { client } from "@/sanity/lib/client";

export const revalidate = 1;

export const getAllSubCategories = async () => {
  const query = `*[_type == "subcategory"]{
    title,
    slug,
    _id,
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



export const getSubCategoryOptions = async () => {
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

export const getSubCategoriesByID = async (id: string) => {


  const query = `*[_type == "subcategory" && category._ref == $categoryId]{
    _id,
    title,
    slug,
    "category": category->{
      _id,
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

  const params = {
    categoryId: id,
  };

  const data = await client.fetch(query, params);

  return data;


};
