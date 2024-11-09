import { client } from "@/lib/sanity";

export const getOptionsByID = async (subcategoryId:string) => {

  const query = `*[_type == "option" && $subcate in subcategories[]._ref] {
    _id,
    title,
    slug,
    values,
    subcategories[]->{
      _id,
      title
    }
  }`;

  const params = {
    subcate: subcategoryId,
  };

  try {
    const options = await client.fetch(query, params);
   
    
    return options;
  } catch (error) {
   
    return [];
  }
};
